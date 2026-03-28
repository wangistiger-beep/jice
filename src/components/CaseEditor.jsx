import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { apiRequest } from '../lib/api';
import { categoryOptions, defaultCaseData, logoOptions, productTypeOptions, steps } from './caseEditor/constants';
import { validateCase } from './caseEditor/validators';

export default function CaseEditor({ caseData = null, onSave, onCancel }) {
  const [formData, setFormData] = useState(defaultCaseData);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showSubmitErrors, setShowSubmitErrors] = useState(false);
  const { getToken } = useAuth();
  const totalSteps = 6;

  useEffect(() => {
    if (caseData) {
      setFormData({
        ...defaultCaseData,
        ...caseData,
        tags: caseData.tags || [],
        caseType: caseData.caseType || 'failure'
      });
    }
  }, [caseData]);

  const validateAll = () => {
    const newErrors = validateCase(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleInputChange = (section, field, value) => {
    if (section === '') {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setShowSubmitErrors(true);
    if (!validateAll()) {
      alert('请填写所有必填项目后再提交！');
      return;
    }
    
    setLoading(true);
    try {
      const token = getToken();

      const submitData = {
        ...formData,
        status: 'pending'
      };

      if (caseData?.id) {
        const result = await apiRequest(`/cases/${caseData.id}`, {
          method: 'PUT',
          token,
          body: submitData,
        });
        if (onSave) onSave(result);
      } else {
        const result = await apiRequest('/cases', {
          method: 'POST',
          token,
          body: submitData,
        });
        if (onSave) onSave(result);
      }
    } catch (error) {
      alert('提交失败: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, value, onChange, placeholder, error, multiline = false, required = true }) => (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b] min-h-[120px] ${
            error ? 'border-red-500' : ''
          }`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b] ${
            error ? 'border-red-500' : ''
          }`}
        />
      )}
      {error && (
        <p className="text-red-500 font-mono text-sm mt-2">⚠️ {error}</p>
      )}
    </div>
  );

  const SelectField = ({ label, value, onChange, options, required = true }) => (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b] bg-white"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const RadioField = ({ label, value, onChange, options, required = true }) => (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-6">
        {options.map(opt => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5"
            />
            <span className="font-mono">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="brutal-card bg-[#ffeb3b] p-4 mb-6">
        <h3 className="font-black font-mono uppercase">第一部分：档案背景</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="案例标题"
          value={formData.title}
          onChange={(v) => handleInputChange('', 'title', v)}
          placeholder="请输入案例标题"
          error={showSubmitErrors ? errors.title : ''}
        />
        <RadioField
          label="案例类型"
          value={formData.caseType}
          onChange={(v) => handleInputChange('', 'caseType', v)}
          options={[
            { value: 'failure', label: '❌ 失败案例' },
            { value: 'success', label: '✅ 成功案例' }
          ]}
        />
        <div className="brutal-card bg-gray-100 p-4 text-center">
          <p className="font-mono text-sm">
            {formData.caseType === 'failure' ? '❌ 失败案例分析' : '✅ 成功案例分析'}
          </p>
          <p className="font-mono text-xs text-gray-600 mt-1">
            {formData.caseType === 'failure' 
              ? '分析失败原因，提供转型建议' 
              : '总结成功经验，提炼可复制模式'}
          </p>
        </div>
        {formData.caseType === 'success' && (
          <InputField
            label="盈利金额"
            value={formData.profitAmount}
            onChange={(v) => handleInputChange('', 'profitAmount', v)}
            placeholder="如：1000亿美元"
            required={false}
          />
        )}
        {formData.caseType === 'failure' && (
          <InputField
            label="亏损金额"
            value={formData.lossAmount}
            onChange={(v) => handleInputChange('', 'lossAmount', v)}
            placeholder="如：20亿美元"
            required={false}
          />
        )}
        <SelectField
          label="图标选择"
          value={formData.logo}
          onChange={(v) => handleInputChange('', 'logo', v)}
          options={logoOptions.map(o => o.value)}
        />
        <SelectField
          label="分类"
          value={formData.category}
          onChange={(v) => handleInputChange('', 'category', v)}
          options={categoryOptions}
        />
        <SelectField
          label="产品类型"
          value={formData.productType}
          onChange={(v) => handleInputChange('', 'productType', v)}
          options={productTypeOptions}
        />
      </div>
      
      <InputField
        label="免责声明"
        value={formData.disclaimer}
        onChange={(v) => handleInputChange('', 'disclaimer', v)}
        placeholder="AI辅助摘要，仅供教育用途..."
        required={false}
        multiline
      />
      
      <div className="mb-5">
        <label className="block font-black font-mono uppercase text-sm mb-2">
          标签
        </label>
        <div className="flex gap-2 mb-3 flex-wrap">
          {formData.tags.map(tag => (
            <span key={tag} className="tag bg-[#ffeb3b] px-3 py-1 flex items-center gap-2">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="font-black hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            placeholder="输入标签后按回车"
            className="flex-1 px-4 py-4 font-sans text-lg border-4 border-black focus:outline-none focus:ring-4 focus:ring-[#ffeb3b]"
          />
          <button
            type="button"
            onClick={addTag}
            className="brutal-btn bg-[#ffeb3b] px-6"
          >
            添加
          </button>
        </div>
      </div>
      
      <div className="border-t-4 border-black pt-6">
        <h4 className="font-black font-mono uppercase mb-4">基本信息</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="公司名称"
            value={formData.profile.companyName}
            onChange={(v) => handleInputChange('profile', 'companyName', v)}
            placeholder="请输入公司名称"
            error={showSubmitErrors ? errors.companyName : ''}
          />
          <InputField
            label="总部位置"
            value={formData.profile.location}
            onChange={(v) => handleInputChange('profile', 'location', v)}
            placeholder="请输入总部位置"
          />
          <InputField
            label="核心技术/定位"
            value={formData.profile.coreTech}
            onChange={(v) => handleInputChange('profile', 'coreTech', v)}
            placeholder="如：垂直农业、AI医疗"
          />
          <InputField
            label="累计融资总额"
            value={formData.profile.totalFunding}
            onChange={(v) => handleInputChange('profile', 'totalFunding', v)}
            placeholder="请输入融资总额"
          />
        </div>
        <InputField
          label="关键投资机构"
          value={formData.profile.investors}
          onChange={(v) => handleInputChange('profile', 'investors', v)}
          placeholder="请输入投资机构"
        />
        <InputField
          label="愿景与价值主张"
          value={formData.profile.vision}
          onChange={(v) => handleInputChange('profile', 'vision', v)}
          placeholder="它解决了什么痛点？"
          required={false}
          multiline
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputField
            label="成立时间"
            value={formData.profile.founded}
            onChange={(v) => handleInputChange('profile', 'founded', v)}
            placeholder="如：2015年"
          />
          <InputField
            label="关闭时间"
            value={formData.profile.closed}
            onChange={(v) => handleInputChange('profile', 'closed', v)}
            placeholder="如：2020年"
          />
          <InputField
            label="烧钱总额"
            value={formData.profile.cashBurned}
            onChange={(v) => handleInputChange('profile', 'cashBurned', v)}
            placeholder="请输入烧钱总额"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => {
    const isFailure = formData.caseType === 'failure';
    
    return (
      <div className="space-y-6">
        <div className={`brutal-card p-4 mb-6 ${isFailure ? 'bg-[#ff3b3b] text-white' : 'bg-green-500 text-white'}`}>
          <h3 className="font-black font-mono uppercase">
            第二部分：{isFailure ? '深度剖析' : '成功密码'}
          </h3>
        </div>
        
        {isFailure ? (
          <>
            <InputField
              label="核心死因"
              value={formData.failure.fatalFlaw}
              onChange={(v) => handleInputChange('failure', 'fatalFlaw', v)}
              placeholder="用一句话总结失败的本质"
              error={showSubmitErrors ? errors.fatalFlaw : ''}
            />
            
            <InputField
              label="市场/行业背景"
              value={formData.failure.marketBackground}
              onChange={(v) => handleInputChange('failure', 'marketBackground', v)}
              placeholder="分析当时的市场泡沫、竞争格局或行业状态"
              required={false}
              multiline
            />
            
            <div className="border-t-4 border-black pt-6">
              <h4 className="font-black font-mono uppercase mb-4">底层逻辑漏洞</h4>
              <InputField
                label="经济逻辑"
                value={formData.failure.economicLogic}
                onChange={(v) => handleInputChange('failure', 'economicLogic', v)}
                placeholder="收入能否覆盖成本？（Unit Economics）"
                required={false}
                multiline
              />
              <InputField
                label="物理/技术限制"
                value={formData.failure.techLimitations}
                onChange={(v) => handleInputChange('failure', 'techLimitations', v)}
                placeholder="是否存在技术实现瓶颈？"
                required={false}
                multiline
              />
              <InputField
                label="可扩展性"
                value={formData.failure.scalability}
                onChange={(v) => handleInputChange('failure', 'scalability', v)}
                placeholder="分析增长模式特点"
                required={false}
                multiline
              />
              <InputField
                label="创业经验教训"
                value={formData.failure.lessonsLearned}
                onChange={(v) => handleInputChange('failure', 'lessonsLearned', v)}
                placeholder="从失败中得到的经验"
                required={false}
                multiline
              />
            </div>
          </>
        ) : (
          <>
            <InputField
              label="成功要素"
              value={formData.success.successFactor}
              onChange={(v) => handleInputChange('success', 'successFactor', v)}
              placeholder="用一句话总结成功的关键"
              error={showSubmitErrors ? errors.successFactor : ''}
            />
            
            <InputField
              label="市场策略"
              value={formData.success.marketStrategy}
              onChange={(v) => handleInputChange('success', 'marketStrategy', v)}
              placeholder="分析市场定位和竞争策略"
              required={false}
              multiline
            />
            
            <div className="border-t-4 border-black pt-6">
              <h4 className="font-black font-mono uppercase mb-4">成功密码解密</h4>
              <InputField
                label="商业模式"
                value={formData.success.businessModel}
                onChange={(v) => handleInputChange('success', 'businessModel', v)}
                placeholder="分析收入模型和单位经济学"
                required={false}
                multiline
              />
              <InputField
                label="技术创新"
                value={formData.success.techInnovation}
                onChange={(v) => handleInputChange('success', 'techInnovation', v)}
                placeholder="技术壁垒和创新优势"
                required={false}
                multiline
              />
              <InputField
                label="增长策略"
                value={formData.success.growthStrategy}
                onChange={(v) => handleInputChange('success', 'growthStrategy', v)}
                placeholder="用户获取和增长策略"
                required={false}
                multiline
              />
              <InputField
                label="成功经验"
                value={formData.success.successLessons}
                onChange={(v) => handleInputChange('success', 'successLessons', v)}
                placeholder="从成功中得到的启示"
                required={false}
                multiline
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const RatingInput = ({ label, value, onChange }) => (
    <div className="mb-5">
      <label className="block font-black font-mono uppercase text-sm mb-2">
        {label}
      </label>
      <div className="flex gap-3 items-center">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`w-12 h-12 border-4 border-black font-black font-mono text-lg flex items-center justify-center ${
              value >= score ? 'bg-[#ffeb3b]' : 'bg-white'
            }`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => {
    const isFailure = formData.caseType === 'failure';
    
    return (
      <div className="space-y-6">
        <div className="brutal-card bg-blue-100 p-4 mb-6">
          <h3 className="font-black font-mono uppercase">第三部分：评估维度</h3>
        </div>
        
        <RatingInput
          label="市场潜力评分 (1-5)"
          value={formData.marketPotentialScore}
          onChange={(v) => handleInputChange('', 'marketPotentialScore', v)}
        />
        
        <RatingInput
          label="潜在规模评分 (1-5)"
          value={formData.potentialScale}
          onChange={(v) => handleInputChange('', 'potentialScale', v)}
        />
        
        {isFailure && (
          <RatingInput
            label="重建潜力评分 (1-5)"
            value={formData.rebuildPotential}
            onChange={(v) => handleInputChange('', 'rebuildPotential', v)}
          />
        )}
        
        <InputField
          label="市场潜力"
          value={formData.assessment.marketPotential}
          onChange={(v) => handleInputChange('assessment', 'marketPotential', v)}
          placeholder="评估市场规模和增长潜力"
          required={false}
          multiline
        />
        
        <InputField
          label="难度分析"
          value={formData.assessment.difficultyAnalysis}
          onChange={(v) => handleInputChange('assessment', 'difficultyAnalysis', v)}
          placeholder="分析实现难度和挑战"
          required={false}
          multiline
        />
        
        <InputField
          label="可扩展性分析"
          value={formData.assessment.scalabilityAnalysis}
          onChange={(v) => handleInputChange('assessment', 'scalabilityAnalysis', v)}
          placeholder="深度分析业务的可扩展性"
          required={false}
          multiline
        />
        
        <div className="brutal-card bg-gray-100 p-4">
          <h4 className="font-black font-mono uppercase mb-4">
            {isFailure ? '相关失败案例' : '相关成功案例'}
          </h4>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔗</div>
            <p className="font-mono text-sm text-gray-600">相关案例关联功能开发中...</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    const isFailure = formData.caseType === 'failure';
    
    if (!isFailure) {
      return (
        <div className="space-y-6">
          <div className="brutal-card bg-green-100 p-4 mb-6">
            <h3 className="font-black font-mono uppercase">第四部分：增长与扩张策略</h3>
          </div>
          
          <InputField
            label="增长核心概念"
            value={formData.rebuild.pivotConcept}
            onChange={(v) => handleInputChange('rebuild', 'pivotConcept', v)}
            placeholder="明确增长方向"
            required={false}
          />
          
          <InputField
            label="洞察"
            value={formData.rebuild.insight}
            onChange={(v) => handleInputChange('rebuild', 'insight', v)}
            placeholder="分析增长逻辑和市场机会"
            required={false}
            multiline
          />
          
          <InputField
            label="产品迭代"
            value={formData.rebuild.productRefactor}
            onChange={(v) => handleInputChange('rebuild', 'productRefactor', v)}
            placeholder="产品优化和迭代策略"
            required={false}
            multiline
          />
          
          <InputField
            label="切入点"
            value={formData.rebuild.wedge}
            onChange={(v) => handleInputChange('rebuild', 'wedge', v)}
            placeholder="确定高价值细分市场"
            required={false}
            multiline
          />
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <div className="brutal-card bg-green-100 p-4 mb-6">
          <h3 className="font-black font-mono uppercase">第四部分：重生与转型策略</h3>
        </div>
        
        <InputField
          label="转型核心概念"
          value={formData.rebuild.pivotConcept}
          onChange={(v) => handleInputChange('rebuild', 'pivotConcept', v)}
          placeholder="明确转型方向"
          error={showSubmitErrors ? errors.pivotConcept : ''}
        />
        
        <InputField
          label="洞察"
          value={formData.rebuild.insight}
          onChange={(v) => handleInputChange('rebuild', 'insight', v)}
          placeholder="分析转型逻辑和盈利基础"
          required={false}
          multiline
        />
        
        <InputField
          label="产品重构"
          value={formData.rebuild.productRefactor}
          onChange={(v) => handleInputChange('rebuild', 'productRefactor', v)}
          placeholder="业务模式转变"
          required={false}
          multiline
        />
        
        <InputField
          label="切入点"
          value={formData.rebuild.wedge}
          onChange={(v) => handleInputChange('rebuild', 'wedge', v)}
          placeholder="确定高价值细分市场"
          required={false}
          multiline
        />
      </div>
    );
  };

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="brutal-card bg-purple-100 p-4 mb-6">
        <h3 className="font-black font-mono uppercase">第五部分：技术与执行规划</h3>
      </div>
      
      <InputField
        label="技术栈建议"
        value={formData.execution.techStack}
        onChange={(v) => handleInputChange('execution', 'techStack', v)}
        placeholder="列出实现转型所需的核心工具"
        error={showSubmitErrors ? errors.techStack : ''}
      />
      
      <div className="border-t-4 border-black pt-6">
        <h4 className="font-black font-mono uppercase mb-4">阶段性执行路径</h4>
        <InputField
          label="Phase 1 (MVP)"
          value={formData.execution.phase1}
          onChange={(v) => handleInputChange('execution', 'phase1', v)}
          placeholder="如何用最快速度拿到第一笔钱？"
          required={false}
          multiline
        />
        <InputField
          label="Phase 2 (Validation)"
          value={formData.execution.phase2}
          onChange={(v) => handleInputChange('execution', 'phase2', v)}
          placeholder="如何利用 AI/数据验证核心效果？"
          required={false}
          multiline
        />
        <InputField
          label="Phase 3 (Scaling)"
          value={formData.execution.phase3}
          onChange={(v) => handleInputChange('execution', 'phase3', v)}
          placeholder="如何通过渠道合作或产品化进行扩张？"
          required={false}
          multiline
        />
        <InputField
          label="Phase 4 (Moat)"
          value={formData.execution.phase4}
          onChange={(v) => handleInputChange('execution', 'phase4', v)}
          placeholder="如何构建“数据护城河”并实现最终退出？"
          required={false}
          multiline
        />
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="brutal-card bg-orange-100 p-4 mb-6">
        <h3 className="font-black font-mono uppercase">第六部分：盈利与退出模型</h3>
      </div>
      
      <InputField
        label="收入流组合"
        value={formData.monetization.revenueStreams}
        onChange={(v) => handleInputChange('monetization', 'revenueStreams', v)}
        placeholder="区分一次性收入与持续性收入"
        error={showSubmitErrors ? errors.revenueStreams : ''}
      />
      
      <InputField
        label="利润率分析"
        value={formData.monetization.profitAnalysis}
        onChange={(v) => handleInputChange('monetization', 'profitAnalysis', v)}
        placeholder="验证新模式的单位经济效益"
        required={false}
        multiline
      />
      
      <InputField
        label="退出逻辑"
        value={formData.monetization.exitLogic}
        onChange={(v) => handleInputChange('monetization', 'exitLogic', v)}
        placeholder="分析潜在收购方及估值模型"
        required={false}
        multiline
      />
      
      {showSubmitErrors && Object.keys(errors).length > 0 && (
        <div className="brutal-card bg-red-100 p-4 mb-6">
          <h3 className="font-black font-mono uppercase text-red-700 mb-2">⚠️ 请填写以下必填项目</h3>
          <ul className="list-disc list-inside font-mono text-sm text-red-600">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="brutal-card bg-white p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-black font-mono text-2xl uppercase">
          {caseData ? '编辑案例' : '提交新案例'}
        </h2>
        <button
          onClick={onCancel}
          className="brutal-btn bg-gray-200 px-4 py-2 text-sm font-mono uppercase"
        >
          取消
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((step) => (
          <div key={step.num} className="flex items-center flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full border-4 border-black flex items-center justify-center font-black font-mono cursor-pointer transition-colors ${
                step.num <= currentStep ? 'bg-[#ffeb3b]' : 'bg-gray-100'
              }`}
              onClick={() => setCurrentStep(step.num)}
            >
              {step.num}
            </div>
            <span className="ml-2 font-mono text-sm hidden sm:inline">
              {step.label}
            </span>
            {step.num < totalSteps && (
              <div
                className={`w-8 h-2 border-t-4 border-black mx-2 ${
                  step.num < currentStep ? 'bg-[#ffeb3b]' : 'bg-gray-100'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="min-h-[400px]">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t-4 border-black">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1 || loading}
          className="brutal-btn bg-gray-200 px-6 py-3 text-sm font-mono uppercase disabled:opacity-50"
        >
          ← 上一步
        </button>
        
        {currentStep < totalSteps ? (
          <button
            onClick={handleNext}
            disabled={loading}
            className="brutal-btn bg-[#ffeb3b] px-6 py-3 text-sm font-mono uppercase disabled:opacity-50"
          >
            下一步 →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="brutal-btn bg-[#ffeb3b] px-6 py-3 text-sm font-mono uppercase disabled:opacity-50"
          >
            {loading ? '提交中...' : '✓ 提交案例'}
          </button>
        )}
      </div>
    </div>
  );
}
