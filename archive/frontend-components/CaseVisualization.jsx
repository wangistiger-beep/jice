import { useEffect, useRef } from 'react';

const parseAmount = (str) => {
  if (!str) return 0;
  const match = str.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  let num = parseFloat(match[1]);
  if (str.includes('亿') || str.includes('B')) num *= 100000000;
  else if (str.includes('千万') || str.includes('M')) num *= 10000000;
  else if (str.includes('百万')) num *= 1000000;
  else if (str.includes('万') || str.includes('K')) num *= 10000;
  return num;
};

export default function CaseVisualization({ formData }) {
  const fundingChartRef = useRef(null);
  const timelineChartRef = useRef(null);

  useEffect(() => {
    if (!fundingChartRef.current || !window.echarts) return;
    
    const chart = window.echarts.init(fundingChartRef.current);
    
    const option = {
      title: {
        text: '资金概况',
        left: 'center',
        textStyle: {
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['融资总额', '烧钱总额'],
        axisLabel: {
          fontFamily: 'monospace'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontFamily: 'monospace'
        }
      },
      series: [
        {
          name: '金额',
          type: 'bar',
          data: [
            { 
              value: parseAmount(formData.profile.totalFunding), 
              itemStyle: { color: '#22c55e' } 
            },
            { 
              value: parseAmount(formData.profile.cashBurned), 
              itemStyle: { color: '#ef4444' } 
            }
          ],
          barWidth: '40%'
        }
      ]
    };
    
    chart.setOption(option);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [formData.profile.totalFunding, formData.profile.cashBurned]);

  useEffect(() => {
    if (!timelineChartRef.current || !window.echarts) return;
    
    const chart = window.echarts.init(timelineChartRef.current);
    
    const founded = formData.profile.founded;
    const closed = formData.profile.closed;
    
    const hasTimelineData = founded || closed;
    
    const option = {
      title: {
        text: '生命周期时间线',
        left: 'center',
        textStyle: {
          fontFamily: 'monospace',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: hasTimelineData ? [founded || '?', closed || '?'] : ['', ''],
        axisLabel: {
          fontFamily: 'monospace',
          fontSize: 12
        }
      },
      yAxis: {
        type: 'value',
        max: 1,
        show: false
      },
      series: [
        {
          type: 'line',
          data: hasTimelineData ? [0.5, 0.5] : [],
          symbol: 'circle',
          symbolSize: 20,
          lineStyle: {
            width: 4,
            color: '#ffeb3b'
          },
          itemStyle: {
            color: '#ffeb3b',
            borderColor: '#000',
            borderWidth: 3
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params) => {
              if (params.dataIndex === 0) return '成立';
              return '关闭';
            },
            fontFamily: 'monospace',
            fontWeight: 'bold'
          }
        }
      ]
    };
    
    chart.setOption(option);
    
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [formData.profile.founded, formData.profile.closed]);

  const missingFields = [];
  if (!formData.title) missingFields.push('案例标题');
  if (!formData.profile.companyName) missingFields.push('公司名称');
  if (!formData.failure.fatalFlaw) missingFields.push('核心死因');

  return (
    <div className="space-y-6">
      <div className="brutal-card bg-white p-6">
        <h3 className="font-black font-mono text-xl uppercase mb-6 border-b-4 border-black pb-4">
          数据可视化
        </h3>
        
        {missingFields.length > 0 && (
          <div className="brutal-card bg-yellow-100 border-yellow-500 p-4 mb-6">
            <h4 className="font-black font-mono uppercase text-sm mb-2">
              ⚠️ 必填字段提示
            </h4>
            <p className="font-mono text-sm text-yellow-800">
              请先填写以下字段以生成完整可视化：
            </p>
            <ul className="font-mono text-sm text-yellow-800 mt-2 ml-4">
              {missingFields.map((field, i) => (
                <li key={i}>• {field}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="brutal-card bg-gray-50 p-4">
            <div
              ref={fundingChartRef}
              style={{ height: '300px', width: '100%' }}
            />
          </div>
          
          <div className="brutal-card bg-gray-50 p-4">
            <div
              ref={timelineChartRef}
              style={{ height: '300px', width: '100%' }}
            />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="brutal-card bg-blue-50 p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-black font-mono text-sm uppercase">实时同步</div>
            <p className="font-mono text-xs text-gray-600 mt-1">
              修改数据图表自动更新
            </p>
          </div>
          <div className="brutal-card bg-green-50 p-4 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <div className="font-black font-mono text-sm uppercase">可视化呈现</div>
            <p className="font-mono text-xs text-gray-600 mt-1">
              直观展示案例关键数据
            </p>
          </div>
          <div className="brutal-card bg-purple-50 p-4 text-center">
            <div className="text-3xl mb-2">🔗</div>
            <div className="font-black font-mono text-sm uppercase">双向联动</div>
            <p className="font-mono text-xs text-gray-600 mt-1">
              编辑器与图表实时联动
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
