document.addEventListener("DOMContentLoaded", () => {
  // Try to determine current subject code from the DOM
  const codeElem = document.querySelector(".hero-text p strong");
  if (!codeElem) return; // Not a subject page
  
  const parentText = codeElem.parentElement.textContent;
  const match = parentText.match(/(BED\d{3})/);
  if (!match) return; // Could not find subject code
  
  const subjectCode = match[1];

  fetch('data/subjects.json')
    .then(response => response.json())
    .then(data => {
      if (data && data.subjects) {
        const subject = data.subjects.find(s => s.code === subjectCode);
        if (subject) {
          
          const updateLink = (id, url) => {
            const el = document.getElementById(id);
            if (el) {
              if (url && url.trim() !== '') {
                el.href = url;
              } else {
                // If the URL is empty, hide the list item completely
                el.parentElement.style.display = 'none';
              }
            }
          };

          updateLink('link-pre-exm', subject.preliminary_exam);
          updateLink('link-mcq', subject.mcq);
          updateLink('link-practical', subject.practical);
          updateLink('link-practical-b', subject.practical_b);
        }
      }
    })
    .catch(err => console.error("Could not load dynamic PDFs:", err));
});
