export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const scripts = {
      funny: `哈哈哈，这段剧情太搞笑了！😂

开头就给大家来了个惊喜，这反转来得太突然了！

剧情发展到这儿，我已经笑到停不下来了，这演员的表情管理绝了！

高潮来了！这一段简直是全剧最爆笑的部分，看一次笑一次！

转折过渡也很自然，编剧太有才了！

最后的结局简直神来之笔，这脑洞我服了！

喜欢这种搞笑风格的记得点赞关注，下期更精彩！`,
      suspense: `注意看，这个男人叫小帅...🔍

开场就充满了悬念，每一个细节都暗藏玄机。

随着剧情推进，谜团越来越多，真相究竟是什么？

高潮部分！所有的线索开始串联，真相即将浮出水面！

转折！原来幕后黑手竟然是他！这个反转太精彩了！

结局揭晓，所有的谜团都有了答案，这个结局你猜到了吗？

喜欢悬疑推理的记得关注，下期案件更加扑朔迷离！`,
      romance: `这是一段让人心动的爱情故事...💕

初次相遇，命运的齿轮开始转动。

相处的点点滴滴，每一个细节都充满甜蜜。

最动人的时刻，他们的感情达到了顶点。

经历波折，他们的爱情更加坚定。

最终，他们走到了一起，这就是爱情最美好的样子。

相信爱情的你，一定要点赞支持！`,
      action: `燃起来了！这段打斗场面太震撼了！💥

开场就是高能，动作设计行云流水！

战斗升级，每一招每一式都充满力量感！

最高潮的对决！这一招一式看得人热血沸腾！

局势逆转，主角展现出真正的实力！

最终决战，正义战胜邪恶，太燃了！

喜欢动作片的兄弟记得关注，下期更精彩！`,
      family: `家，永远是最温暖的港湾...🏠

故事从平凡的家庭生活开始，却蕴含着深刻的情感。

家人之间的互动，每一个细节都让人感到温暖。

情感的高潮，家人之间的羁绊让人动容。

经历误会与和解，家人之间的感情更加深厚。

最终，一家人团聚，这就是家的意义。

珍惜家人的朋友，请点赞支持！`,
      fantasy: `欢迎来到玄幻世界，这里一切皆有可能...✨

开篇就展现了宏大的世界观，让人身临其境。

主角踏上修炼之路，奇遇不断，实力飞速提升。

最精彩的战斗场面，法术神通各显神通！

剧情转折，隐藏的秘密逐渐揭晓。

最终决战，主角突破极限，成就传奇！

喜欢玄幻修仙的记得关注，下期更加精彩！`
    };

    const script = scripts[style] || scripts.funny;
    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime: 75, type: 'transition', description: '转折过渡，引出结局' },
      { id: '5', startTime: 75, endTime: 90, type: 'highlight', description: '精彩结局，完美收尾' },
    ];

    return res.status(200).json({
      success: true,
      script,
      segments,
      highlights: [0, 45, 75]
    });

  } catch (error) {
    return res.status(500).json({ error: 'AI分析失败' });
  }
}
export default async function handlerexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2.export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role:export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 20export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw newexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${responseexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const resultexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script =export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTimeexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 1export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, typeexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime:export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime: 75, type: 'transition', descriptionexport default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime: 75, type: 'transition', description: '转折过渡，引出结局' },
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime: 75, type: 'transition', description: '转折过渡，引出结局' },
      { id: '5', startTime: 75, endTime: 90,export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { style, videoName } = req.body;

    const KIMI_API_KEY = process.env.KIMI_API_KEY || 'your_kimi_api_key';
    const KIMI_API_URL = 'https://api.moonshot.cn/v1/chat/completions';

    const styleNames = {
      funny: '搞笑解说',
      suspense: '悬疑推理',
      romance: '甜蜜爱情',
      action: '热血动作',
      family: '家庭伦理',
      fantasy: '玄幻修仙'
    };

    const styleName = styleNames[style] || '搞笑解说';

    const prompt = `
你是一个专业的抖音短剧解说文案生成器。请根据以下信息生成一段精彩的短剧解说文案：

视频名称：${videoName || '热门短剧'}
剪辑风格：${styleName}

要求：
1. 文案风格要符合${styleName}的特点
2. 结构清晰，包含开场、剧情发展、高潮、转折、结局
3. 语言口语化，有感染力，适合抖音平台
4. 使用表情符号增加吸引力
5. 最后要有引导关注的话术

请直接输出文案内容，不要有其他额外信息。
    `.trim();

    const response = await fetch(KIMI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-8k',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的短剧解说文案生成助手，擅长创作各种风格的抖音短剧解说。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Kimi API请求失败: ${response.status}`);
    }

    const result = await response.json();
    const script = result.choices?.[0]?.message?.content || '';

    if (!script) {
      throw new Error('未能生成解说文案');
    }

    const segments = [
      { id: '1', startTime: 0, endTime: 15, type: 'highlight', description: '开场精彩片段，吸引观众注意力' },
      { id: '2', startTime: 15, endTime: 45, type: 'normal', description: '剧情发展，铺垫故事背景' },
      { id: '3', startTime: 45, endTime: 60, type: 'highlight', description: '高潮部分，最精彩的情节' },
      { id: '4', startTime: 60, endTime: 75, type: 'transition', description: '转折过渡，引出结局' },
      { id: '5', startTime: 75, endTime: 90, type: 'highlight', description: '精彩结局