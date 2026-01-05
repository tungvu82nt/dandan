import React from 'react';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

const Footer: React.FC = () => {
  const { config } = useSiteConfig();
  const { footer } = config;

  return (
    <footer className="w-full bg-[#f2f2f2] border-t-2 border-[#dedede] pt-8 pb-8 mt-12">
      <div className="max-w-container mx-auto px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Donation Info */}
          <div className="flex-1">
            <h2 className="text-primary font-bold text-lg mb-4 border-l-4 border-primary pl-3">捐赠账号</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="text-primary font-bold">开户单位:</span> {footer.bankUnit}</p>
              <p><span className="text-primary font-bold">开 户 行:</span> {footer.bankName}</p>
              <p><span className="text-primary font-bold">捐赠账号:</span> {footer.bankAccount}</p>
              <p><span className="text-primary font-bold">咨询电话:</span> {footer.phone} （财务室）</p>
              <p><span className="text-primary font-bold">网络筹款:</span> 029-88443165 （网信部）</p>
              <p className="text-xs text-gray-400 mt-2">备注：请注明捐款用途</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex-[2] text-sm text-gray-600 leading-7">
            <h3 className="font-bold text-lg mb-2 text-gray-800">西安市慈善会</h3>
            <p>地址：{footer.address}</p>
            <p>电话：{footer.phone}</p>
            <p>邮箱：{footer.email}</p>
            <p>邮编：710021</p>
            <p className="mt-4">
              <a href="#" className="hover:text-primary">陕ICP备16001582号-1</a>
            </p>
            <p>技术支持：{footer.techSupport}</p>
          </div>

          {/* QR Codes */}
          <div className="flex-1 flex justify-end gap-6">
            <div className="text-center">
              <img 
                src="https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20210825/248ac00189d845b09a8470fd7cf8e806.png" 
                alt="WeChat" 
                className="w-24 h-24 mb-2"
              />
              <p className="text-xs text-gray-500">扫码关注官方微信</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;