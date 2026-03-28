import { Link } from 'react-router-dom';

const causeColors = {
  "没有市场需求": "bg-red-100 border-red-500",
  "单位经济失败": "bg-orange-100 border-orange-500",
  "时机错误": "bg-blue-100 border-blue-500",
  "竞争激烈": "bg-purple-100 border-purple-500",
  "领导层失职": "bg-green-100 border-green-500",
  "欺诈": "bg-red-200 border-red-700",
  "监管失败": "bg-yellow-100 border-yellow-600",
  "频繁转型": "bg-pink-100 border-pink-500",
  "盲目扩张": "bg-indigo-100 border-indigo-500",
  "管理混乱": "bg-gray-100 border-gray-500",
  "运营失败": "bg-amber-100 border-amber-500",
  "过度工程化": "bg-cyan-100 border-cyan-600",
  "留存问题": "bg-teal-100 border-teal-500",
  "体验糟糕": "bg-rose-100 border-rose-500",
  "营销不力": "bg-violet-100 border-violet-500",
  "忽视创作者": "bg-lime-100 border-lime-600",
  "法律风险": "bg-red-100 border-red-400",
  "产品不可用": "bg-red-300 border-red-700",
  "估值虚高": "bg-yellow-200 border-yellow-600",
  "产品问题": "bg-rose-100 border-rose-500",
  "过度烧钱": "bg-orange-200 border-orange-600",
  "过度扩张": "bg-indigo-100 border-indigo-500",
  "无内控": "bg-red-200 border-red-600",
  "投资方撤资": "bg-gray-200 border-gray-600",
  "技术障碍": "bg-slate-100 border-slate-500",
  "市场收缩": "bg-blue-100 border-blue-400",
  "资金链断裂": "bg-red-100 border-red-500",
  "数据造假": "bg-red-200 border-red-700",
  "被收购拆解": "bg-gray-100 border-gray-500",
  "财务造假": "bg-red-300 border-red-800",
  "战略失误": "bg-purple-100 border-purple-400",
  "市场价格崩溃": "bg-blue-200 border-blue-600",
  "平台依赖": "bg-yellow-100 border-yellow-500",
  "营收模式失败": "bg-orange-100 border-orange-400",
  "盈利模式失败": "bg-orange-100 border-orange-400",
  "定价策略失误": "bg-yellow-100 border-yellow-500",
  "共享经济泡沫": "bg-purple-100 border-purple-400",
  "财务管理失误": "bg-red-100 border-red-400",
  "过度补贴": "bg-orange-100 border-orange-500",
  "产品造假": "bg-red-300 border-red-700",
};

function RatingBar({ value, label, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs tracking-wide text-gray-500 w-16">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 border-2 border-black ${i <= value ? color : 'bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function StartupCard({ startup }) {
  const hasCauses = startup.causes && Array.isArray(startup.causes) && startup.causes.length > 0;
  const hasCategories = startup.categories && Array.isArray(startup.categories) && startup.categories.length > 0;
  const isSuccessCase = startup.caseType === 'success';
  
  const displayAmount = isSuccessCase ? 
    (startup.profitAmount || '见详情') : 
    (startup.lossAmount || '见详情');
  
  return (
    <Link to={`/startup/${startup.id}`} className="block">
      <div className="brutal-card p-5 cursor-pointer bg-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-3xl w-12 h-12 flex items-center justify-center border-2 border-black bg-[#ffeb3b] flex-shrink-0">
              {startup.logo}
            </div>
            <div>
              <h3 className="font-black text-lg font-mono uppercase leading-none text-black">{startup.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm">{startup.country || '🇺🇸'}</span>
                <span className="font-mono text-xs text-gray-500">
                  {startup.founded ? `${startup.founded}${startup.died ? `–${startup.died}` : ''}` : ''}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className={`tag border-2 border-black text-xs font-bold ${isSuccessCase ? 'bg-[#d4edda] text-black' : 'bg-[#f8d7da] text-black'}`}>
              {isSuccessCase ? '💰 盈利 ' : '💸 亏损 '}
              {displayAmount}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 leading-relaxed font-sans">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 border-2 border-black p-2">
            <div className="font-mono text-xs text-gray-500 uppercase">融资金额</div>
            <div className="font-black font-mono text-sm text-black">{startup.capital || 'N/A'}</div>
          </div>
          <div className="bg-gray-50 border-2 border-black p-2">
            <div className="font-mono text-xs text-gray-500 uppercase">案例类型</div>
            <div className="font-black font-mono text-sm text-black">{isSuccessCase ? '成功案例' : '失败案例'}</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <RatingBar value={startup.marketPotentialScore || 3} label="市场潜力" color="bg-[#ffeb3b]" />
          <RatingBar value={startup.potentialScale || 3} label="潜在规模" color="bg-[#00b4d8]" />
          {!isSuccessCase && startup.rebuildPotential > 0 && (
            <RatingBar value={startup.rebuildPotential} label="重建潜力" color="bg-[#2ecc71]" />
          )}
        </div>

        {hasCauses && (
          <div className="flex flex-wrap gap-1 mb-3">
            {startup.causes.map((cause) => (
              <span
                key={cause}
                className={`tag text-xs border-2 text-black ${causeColors[cause] || 'bg-gray-100 border-gray-400'}`}
              >
                {cause}
              </span>
            ))}
          </div>
        )}

        {hasCategories && (
          <div className="flex flex-wrap gap-1">
            {startup.categories.map((cat) => (
              <span key={cat} className="tag bg-white text-black border-2 border-black text-xs">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
