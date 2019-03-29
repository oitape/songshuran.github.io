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

    password = prompt('Sorry! If you want to see the detail of this article, Ask me. Also you can guess!  —— Oitm');
    password = sha256(password || '');

    if(passwords.includes(password)) {
      expires = now + day * 3;
      window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
    } else {
      alert('您没有阅读权限');
      window.location.href = root;
    }
  };

  // print github and demo info
  console.log(
    '\n%c Theme-AD v2.3.0 %c' + 
    ' 🎉 https://github.com/dongyuanxin/theme-ad 🎉\n' + 
    '\n%c Preview Online %c' + 
    ' 🔍 https://godbmw.com/ 🔍  \n' , 
    'color: #fadfa3; background: #030307; padding:3px 0;', '', 'color: #fadfa3; background: #030307; padding:3px 0;', ''
  );

  // article password auth
  auth();
})();