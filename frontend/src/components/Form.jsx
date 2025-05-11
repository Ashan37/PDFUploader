const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file || file.type !== 'application/pdf') {
    alert('Please upload a valid PDF file.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('file', file); // Must match field name used in backend

  try {
    const res = await fetch('http://localhost:4000/api/auth/addpdf', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const data = await res.json();
    if (data.success) {
      alert('Form submitted successfully!');
    } else {
      alert('Upload failed: ' + data.message);
    }
  } catch (err) {
    alert('Error submitting form');
    console.error(err);
  }
};
