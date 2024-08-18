document.getElementById('startDrawing').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['html2canvas.min.js', 'drawingTool.js']
      });
    });
  });
  