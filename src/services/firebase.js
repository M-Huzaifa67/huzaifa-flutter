// ── src/services/firebase.js ──
// Firebase contact form submission service.
// Waits for Firebase module to initialize via custom event.

const FirebaseService = {
  db: null,
  ready: false,

  init() {
    // Firebase module fires this event when ready
    window.addEventListener('firebase-ready', () => {
      this.db    = window.__firebaseDb;
      this.ready = true;
    });
  },

  async submitContact(data) {
    if (!this.ready || !this.db) {
      throw new Error('Firebase not initialized. Please configure your Firebase project.');
    }
    const { collection, addDoc, serverTimestamp } = window.__firestoreUtils;
    const docRef = await addDoc(collection(this.db, 'contacts'), {
      name:      data.name,
      email:     data.email,
      subject:   data.subject,
      message:   data.message,
      timestamp: serverTimestamp(),
      read:      false
    });
    return docRef.id;
  }
};

FirebaseService.init();
