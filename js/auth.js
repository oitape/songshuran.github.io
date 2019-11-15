(() => {
  const auth = () => {
    const day = 60 * 60 * 24 * 1000;
    const { is_post, lock, passwords, root } = window.AD_CONFIG;

    if(is_post === false || lock === false) {
      return;
    }

    let [password, expires] = atob(window.localStorage.getItem('auth')).split(':'),
      now = new Date().getTime();

    if(passwords.includes(password) && now < expires) {
      return; 
    }

    password = prompt('Sorry! If you want to see the detail of this page, Ask me !!! \n Also you can guess !  —— By Oitm');
    password = sha256(password || '');

    if(passwords.includes(password)) {
      expires = now + day * 3;
      window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
    } else {
      alert('您没有阅读权限');
      window.location.href = root;
    }
  };
  // article password auth
  auth();
})();