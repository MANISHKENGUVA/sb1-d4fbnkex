document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: analyzeVuePage,
  }, (results) => {
    if (!results || !results[0]) return;
    
    const { components, hasVuex } = results[0].result;
    displayResults(components, hasVuex);
  });
});

function displayResults(components, hasVuex) {
  const componentsList = document.getElementById('components-list');
  const vuexStatus = document.getElementById('vuex-status');

  // Display components
  components.forEach(component => {
    const div = document.createElement('div');
    div.className = 'component';
    div.textContent = component;
    componentsList.appendChild(div);
  });

  // Display Vuex status
  vuexStatus.textContent = hasVuex ? 'Vuex is being used in this application' : 'No Vuex detected';
  vuexStatus.className = 'vuex-store';
}