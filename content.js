function addCopyButtonToBlock(block) {
  // Check if the copy button already exists to avoid duplicates
  if (block.nextElementSibling && block.nextElementSibling.classList.contains('copy-button-container')) {
    console.log('Copy button already exists for this block.');
    return;
  }

  // Define the exact HTML structure for the Copy Code button block as provided
  const copyButtonHTML = `
    <div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span></span><div class="flex items-center"><span class="" data-state="closed"><button class="flex gap-1 items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" class="icon-sm"><path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd" data-darkreader-inline-fill="" style="--darkreader-inline-fill: currentColor;"></path></svg>Copy code</button></span></div></div>
  `;

  // Insert the copy button block directly after the code element
  block.insertAdjacentHTML('afterend', copyButtonHTML);

  // Add event listener for the copy button
  const copyButton = block.nextElementSibling.querySelector('button');
  copyButton.addEventListener('click', () => {
    const codeElement = block.querySelector('code');
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.innerText).then(() => {
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
          copyButton.innerText = 'Copy code';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text:', err);
      });
    }
  });
  console.log('Copy button added to a code block.');
}

function addCopyButtons() {
  const codeBlocks = document.querySelectorAll('div[class*="overflow-y-auto"]');
  codeBlocks.forEach(block => addCopyButtonToBlock(block));
  console.log('Initial copy buttons added.');
}

// Use MutationObserver to watch for new code blocks being added
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.matches('div[class*="overflow-y-auto"]')) {
        console.log('New code block detected:', node);
        addCopyButtonToBlock(node);
      } else if (node.nodeType === 1) {
        node.querySelectorAll('div[class*="overflow-y-auto"]').forEach(subNode => {
          console.log('New nested code block detected:', subNode);
          addCopyButtonToBlock(subNode);
        });
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });

// Run the function when the content script is loaded
document.addEventListener('DOMContentLoaded', addCopyButtons);

// Run the function immediately in case DOMContentLoaded has already fired
addCopyButtons();

// Function to add a new code snippet dynamically


// For testing, dynamically add a new code snippet after 2 seconds
setTimeout(addNewSnippet, 2000);
