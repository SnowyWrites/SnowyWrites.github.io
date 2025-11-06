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

/*Example usage: 
<div class="contentsection" id="section-Flyu" style="display:none;">
  <div class="flyuportraiticons">
    <button class="nestedflyubutton" id="nestedflyubutton" onclick="showNested('AJ96')">AJ96</button>
    <button class="nestedflyubutton" id="nestedflyubutton" onclick="showNested('DRaxin')">D'Raxin</button>
    <button class="nestedflyubutton" id="nestedflyubutton" onclick="showNested('tba')">tba</button>
  </div>
    <div class="flyusubsection" id="nested-flyusubsection" style="display:none;">
  </div>*/