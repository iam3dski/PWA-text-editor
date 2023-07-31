const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  try {
    await promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
  } catch (error) {
    console.error('Error showing install prompt:', error);
  }

  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null; // once the app is installed, remove the deferredPrompt reference
});
