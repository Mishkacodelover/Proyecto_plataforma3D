import PatternView from "./PatternView";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Pattern() {
  const [pattern, setPattern] = useState(null);
  const [alert, setAlert] = useState(false);
  const { authorization } = useAuthContext();

  const formData = new FormData();

  function onFileChange(e) {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
      formData.append("userCreated", authorization.id);
    }
  }

  async function uploadPattern(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/pattern/upload/pattern",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setAlert(true);
        const newImage = await response.json();
        if (newImage) {
          setPattern(newImage);
        }
      } else {
        console.log("error en el registro");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(
    function () {
      async function fetchData() {
        const response = await fetch(
          `http://localhost:8000/pattern/all-patterns/${authorization.id}`
        );
        const data = await response.json();
        setPattern(data);
      }
      fetchData();
    },
    [authorization.id]
  );

  return (
    <PatternView
      pattern={pattern}
      onFileChange={onFileChange}
      uploadPattern={uploadPattern}
      alert={alert}
    />
  );
}
