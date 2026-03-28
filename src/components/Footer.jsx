export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-red-700 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">嘉</span>
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wide">厦门大学嘉庚学院</h3>
                <p className="text-gray-400 text-sm">Xiamen University Tan Kah Kee College</p>
              </div>
            </div>
            <div className="mb-4 p-4 bg-gray-800 rounded-lg border-l-4 border-red-600">
              <p className="text-lg font-serif italic text-gray-300">
                "自强不息，止于至善"
              </p>
              <p className="text-sm text-gray-500 mt-1">—— 校训</p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>福建省·漳州·招商局漳州开发区</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <span>招生热线：0596-6288333</span>
              </p>
              <p className="flex items-center gap-2">
                <span>📧</span>
                <span>邮箱：admissions@xujc.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span>🌐</span>
                <span>官网：www.xujc.com</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-white border-b border-gray-700 pb-2">
              快速导航
            </h4>
            <ul className="space-y-2">
              {[
                { name: "首页", link: "/" },
                { name: "案例库", link: "/" },
                { name: "案例精选", link: "/cases" },
                { name: "案例详情", link: "/case/1" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-white border-b border-gray-700 pb-2">
              学习资源
            </h4>
            <ul className="space-y-2">
              {[
                { name: "案例复盘", link: "/" },
                { name: "成功案例", link: "/" },
                { name: "失败案例", link: "/" },
                { name: "关于我们", link: "/" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>🏫</span>
                <span>厦门大学嘉庚学院案例数据库</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                使用条款
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                联系我们
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              © 2026 厦门大学嘉庚学院. 保留所有权利.
            </p>
            <p className="mt-1 text-xs">
              本案例数据库仅供教学研究使用，案例内容来源于公开资料整理
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gray-800 hover:bg-gray-700 text-white w-14 h-14 flex items-center justify-center text-2xl rounded-lg shadow-lg border border-gray-700 transition-colors">
          🪣
        </button>
        <div className="text-center mt-1 text-xs font-bold text-gray-700">提交</div>
      </div>
    </footer>
  );
}
