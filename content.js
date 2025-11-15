// Find all code blocks
document.querySelectorAll('pre code').forEach(block => {
  const pre = block.parentElement;

  // Avoid adding button twice
  if (pre.querySelector('.copy-btn')) return;

  const button = document.createElement('button');
  button.textContent = 'Copy';
  button.className = 'copy-btn';
  button.setAttribute('aria-label', 'Copy code to clipboard');
  button.setAttribute('title', 'Copy code');

  button.onclick = async () => {
    const code = block.textContent;
    try {
      await navigator.clipboard.writeText(code);
      
      button.textContent = 'Copied!';
      button.classList.add('copied');
      button.setAttribute('aria-label', 'Code copied to clipboard');

      setTimeout(() => {
        button.textContent = 'Copy';
        button.classList.remove('copied');
        button.setAttribute('aria-label', 'Copy code to clipboard');
      }, 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        button.textContent = 'Copied!';
        button.classList.add('copied');
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      } catch (fallbackErr) {
        button.textContent = 'Error';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      }
      document.body.removeChild(textArea);
    }
  };

  pre.style.position = 'relative';
  pre.appendChild(button);
});