// Find all code blocks
document.querySelectorAll('pre code').forEach(block => {
  const pre = block.parentElement;

  // Avoid adding button twice
  if (pre.querySelector('.copy-btn')) return;

  const button = document.createElement('button');
  button.textContent = 'Copy';
  button.className = 'copy-btn';
  button.style.cssText = `
    position: absolute; top: 8px; right: 8px;
    padding: 4px 8px; font-size: 12px;
    background: #2563eb; color: white; border: none;
    border-radius: 4px; cursor: pointer; z-index: 1000;
  `;

  button.onclick = () => {
    const code = block.textContent;
    navigator.clipboard.writeText(code);
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy', 2000);
  };

  pre.style.position = 'relative';
  pre.appendChild(button);
});