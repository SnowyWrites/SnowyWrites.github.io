function showSection(sectionID) {
  const sections = document.querySelectorAll('.contentsection');
  if (!sections.length) return;

  sections.forEach(section => section.style.display = 'none');
  const target = document.getElementById(`section-${sectionID}`);
  if (target) target.style.display = 'block';
}

function showNested(nestedID) {
  const subsections = document.querySelectorAll('.contentsubsection');
  if (!subsections.length) return;

  subsections.forEach(sub => sub.style.display = 'none');
  const target = document.getElementById(`nested-${nestedID}`);
  if (target) target.style.display = 'block';
}
