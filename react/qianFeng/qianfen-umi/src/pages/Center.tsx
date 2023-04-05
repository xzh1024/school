function Center() {
  return (
    <div>
      Center
      <br />
      <button
        onClick={() => {
          localStorage.removeItem('token');
          // history.push('/login');
        }}
      >
        退出登录
      </button>
    </div>
  );
}

// Center.wrappers = ['@/wrappers/Auth'];

export default Center;
