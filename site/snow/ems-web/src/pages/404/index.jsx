import SvgIcon from '@c/svgIcon';
import { useEffect, useState } from 'react';
import loadingGif from '../../../public/images/loading.gif';

export default function index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let count = 0;
    let intervale = setInterval(() => {
      if (count > 10) {
        setIsLoading(false);
        clearInterval(intervale);
      }
      count++;
    }, 100);

    return () => {
      clearInterval(intervale);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      {isLoading ? (
        <>
          <img src={loadingGif} alt="" />
          <div className="text-[#333] text-xl font-semibold leading-8 mt-3">页面加载中...</div>
        </>
      ) : (
        <>
          <SvgIcon name="404"></SvgIcon>
          <div className="text-[#333] text-xl font-semibold leading-8 mt-4">
            抱歉，您没有该页面访问权限或您访问的页面不存在
          </div>
          <div className="text-[#666] text-base font-normal leading-6 mt-3">请检查地址是否正确，或刷新页面</div>
        </>
      )}
    </div>
  );
}
