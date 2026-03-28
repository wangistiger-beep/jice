export function validateCase(formData) {
  const newErrors = {};
  const isFailure = formData.caseType === 'failure';

  if (!formData.title?.trim()) newErrors.title = '请输入案例标题';
  if (!formData.profile?.companyName?.trim()) newErrors.companyName = '请输入公司名称';

  if (isFailure) {
    if (!formData.failure?.fatalFlaw?.trim()) newErrors.fatalFlaw = '请输入核心死因';
    if (!formData.rebuild?.pivotConcept?.trim()) newErrors.pivotConcept = '请输入转型核心概念';
  } else {
    if (!formData.success?.successFactor?.trim()) newErrors.successFactor = '请输入成功要素';
  }

  if (!formData.execution?.techStack?.trim()) newErrors.techStack = '请输入技术栈建议';
  if (!formData.monetization?.revenueStreams?.trim()) newErrors.revenueStreams = '请输入收入流组合';

  return newErrors;
}
