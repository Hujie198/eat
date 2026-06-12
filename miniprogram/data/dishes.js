export const categoryEmojis = {
  '河南菜': '🍜',
  '川菜': '🌶️',
  '湘菜': '🔥',
  '江西菜': '🏔️',
  '山东菜': '🥟',
  '东北菜': '🍲',
  '陕西菜': '🥙',
  '山西菜': '🍝'
}

export const categories = [
  '河南菜',
  '川菜',
  '湘菜',
  '江西菜',
  '山东菜',
  '东北菜',
  '陕西菜',
  '山西菜'
]

export const dishes = [
  { id: 'hn-1', name: '糖醋里脊', category: '河南菜', difficulty: 'medium', sales: 2580, ingredients: ['猪里脊肉', '鸡蛋', '淀粉', '白糖', '醋', '番茄酱'], steps: ['猪里脊切条，用盐、料酒腌制10分钟', '鸡蛋加淀粉调成糊，裹在肉条上', '油烧热，将肉条炸至金黄捞出', '锅中放少许油，加入白糖、醋、番茄酱调成酱汁', '倒入炸好的肉条翻炒均匀即可'] },
  { id: 'hn-2', name: '红烧黄河鲤鱼', category: '河南菜', difficulty: 'hard', sales: 1890, ingredients: ['黄河鲤鱼', '葱', '姜', '蒜', '酱油', '料酒', '白糖'], steps: ['鲤鱼处理干净，两面划刀', '锅中油烧热，将鲤鱼煎至两面金黄', '加入葱姜蒜爆香', '倒入酱油、料酒、白糖和水，大火烧开', '转小火慢炖20分钟，大火收汁即可'] },
  { id: 'hn-3', name: '烩面', category: '河南菜', difficulty: 'medium', sales: 3200, ingredients: ['面粉', '羊肉', '粉丝', '木耳', '海带', '豆腐皮'], steps: ['面粉加水和成面团，醒发30分钟', '羊肉炖汤备用', '面团擀成薄片，拉成面条', '锅中水烧开，下入面条煮熟', '加入羊肉汤、粉丝、木耳、海带、豆腐皮煮5分钟', '撒上香菜即可'] },
  { id: 'hn-4', name: '胡辣汤', category: '河南菜', difficulty: 'easy', sales: 4100, ingredients: ['牛肉', '粉条', '木耳', '面筋', '胡辣汤料'], steps: ['牛肉切片，焯水备用', '锅中加水烧开，加入牛肉片', '放入粉条、木耳、面筋', '加入胡辣汤料，搅拌均匀', '煮10分钟即可'] },
  { id: 'hn-5', name: '锅贴', category: '河南菜', difficulty: 'medium', sales: 2340, ingredients: ['面粉', '猪肉馅', '白菜', '葱姜'], steps: ['面粉加水和成面团，醒发20分钟', '猪肉馅加入白菜末、葱姜末拌匀', '面团擀成皮，包入馅料', '平底锅放油，放入锅贴煎至底部金黄', '加入清水，盖盖焖5分钟，待水干后再煎一会儿即可'] },
  { id: 'hn-6', name: '鸡蛋灌饼', category: '河南菜', difficulty: 'medium', sales: 3560, ingredients: ['面粉', '鸡蛋', '生菜', '甜面酱'], steps: ['面粉加水和成面团，醒发30分钟', '面团分成小剂子，擀成薄饼', '平底锅放油，放入饼胚', '饼鼓起来后戳破一个洞，倒入蛋液', '煎至两面金黄，刷上甜面酱，夹入生菜即可'] },
  { id: 'sc-1', name: '麻婆豆腐', category: '川菜', difficulty: 'medium', sales: 5230, ingredients: ['豆腐', '猪肉末', '豆瓣酱', '花椒粉'], steps: ['豆腐切块，焯水', '锅中放油，炒香猪肉末', '加入豆瓣酱炒出红油', '加水烧开，放入豆腐煮5分钟', '撒上花椒粉即可'] },
  { id: 'sc-2', name: '水煮肉片', category: '川菜', difficulty: 'hard', sales: 4120, ingredients: ['猪里脊肉', '豆芽', '干辣椒', '花椒'], steps: ['猪肉切片，用淀粉腌制', '豆芽焯水铺在碗底', '锅中放油，炒香豆瓣酱', '加水烧开，放入肉片煮至变色', '倒入碗中，撒上干辣椒和花椒', '淋上热油即可'] },
  { id: 'sc-3', name: '回锅肉', category: '川菜', difficulty: 'medium', sales: 3890, ingredients: ['五花肉', '青椒', '蒜苗', '豆瓣酱'], steps: ['五花肉煮至八分熟，切片', '锅中放油，放入肉片煸炒出油', '加入豆瓣酱炒香', '加入青椒和蒜苗翻炒即可'] },
  { id: 'sc-4', name: '宫保鸡丁', category: '川菜', difficulty: 'medium', sales: 4560, ingredients: ['鸡胸肉', '花生米', '干辣椒', '花椒'], steps: ['鸡胸肉切丁，用淀粉腌制', '花生米炸熟', '锅中放油，爆香干辣椒和花椒', '加入鸡丁翻炒', '加入花生米和调料即可'] },
  { id: 'sc-5', name: '鱼香肉丝', category: '川菜', difficulty: 'medium', sales: 4320, ingredients: ['猪肉丝', '胡萝卜', '木耳', '青椒', '鱼香酱'], steps: ['猪肉丝用淀粉腌制10分钟', '胡萝卜、木耳、青椒切丝', '锅中放油，炒香肉丝', '加入配菜翻炒', '倒入鱼香酱调味即可'] },
  { id: 'sc-6', name: '辣子鸡', category: '川菜', difficulty: 'hard', sales: 3890, ingredients: ['鸡肉', '干辣椒', '花椒', '花生米'], steps: ['鸡肉切块，用淀粉腌制', '油烧热，将鸡块炸至金黄', '锅中留少许油，爆香干辣椒和花椒', '加入鸡块和花生米翻炒即可'] },
  { id: 'sc-7', name: '酸辣粉', category: '川菜', difficulty: 'easy', sales: 4670, ingredients: ['红薯粉', '辣椒油', '醋', '花生碎', '豆芽'], steps: ['红薯粉泡发，煮熟', '豆芽焯水', '碗中放入辣椒油、醋、酱油', '倒入粉条和豆芽', '撒上花生碎即可'] },
  { id: 'xiang-1', name: '剁椒鱼头', category: '湘菜', difficulty: 'medium', sales: 4560, ingredients: ['鱼头', '剁椒', '姜', '蒜', '葱'], steps: ['鱼头处理干净，对半切开', '剁椒铺在鱼头上', '姜片、蒜末撒在上面', '上锅蒸15分钟', '撒上葱花，淋上热油即可'] },
  { id: 'xiang-2', name: '辣椒炒肉', category: '湘菜', difficulty: 'easy', sales: 5230, ingredients: ['猪肉丝', '青椒', '蒜', '酱油'], steps: ['猪肉丝用淀粉腌制', '青椒切丝', '锅中放油，爆香蒜末', '加入肉丝翻炒', '加入青椒翻炒，酱油调味即可'] },
  { id: 'xiang-3', name: '毛氏红烧肉', category: '湘菜', difficulty: 'hard', sales: 3890, ingredients: ['五花肉', '白糖', '酱油', '姜'], steps: ['五花肉切块，焯水', '锅中放油，炒糖色', '加入五花肉翻炒上色', '加水烧开，小火炖1小时即可'] },
  { id: 'xiang-4', name: '酸豆角肉末', category: '湘菜', difficulty: 'easy', sales: 4120, ingredients: ['酸豆角', '猪肉末', '蒜', '辣椒'], steps: ['酸豆角切碎', '锅中放油，炒香猪肉末', '加入蒜末和辣椒爆香', '加入酸豆角翻炒即可'] },
  { id: 'xiang-5', name: '小炒黄牛肉', category: '湘菜', difficulty: 'medium', sales: 4890, ingredients: ['黄牛肉', '青椒', '蒜', '姜'], steps: ['牛肉切片，用淀粉腌制', '青椒切丝', '锅中放油，爆香姜蒜', '加入牛肉快速翻炒', '加入青椒翻炒即可'] },
  { id: 'jx-1', name: '藜蒿炒腊肉', category: '江西菜', difficulty: 'easy', sales: 3890, ingredients: ['藜蒿', '腊肉', '蒜', '辣椒'], steps: ['腊肉切片', '藜蒿切段', '锅中放油，炒香腊肉', '加入蒜末和辣椒爆香', '加入藜蒿翻炒即可'] },
  { id: 'jx-2', name: '南昌炒粉', category: '江西菜', difficulty: 'medium', sales: 4560, ingredients: ['米粉', '猪肉丝', '青菜', '酱油'], steps: ['米粉泡发，煮熟', '猪肉丝用淀粉腌制', '青菜切段', '锅中放油，炒香肉丝', '加入米粉和青菜翻炒，酱油调味即可'] },
  { id: 'jx-3', name: '瓦罐汤', category: '江西菜', difficulty: 'hard', sales: 4120, ingredients: ['排骨', '玉米', '胡萝卜', '姜片'], steps: ['排骨焯水', '玉米、胡萝卜切块', '放入瓦罐中，加入姜片和水', '小火慢炖2小时即可'] },
  { id: 'sd-1', name: '九转大肠', category: '山东菜', difficulty: 'hard', sales: 2890, ingredients: ['大肠', '葱姜蒜', '酱油', '糖'], steps: ['大肠清洗干净，焯水', '切成段', '锅中放油，爆香葱姜蒜', '加入大肠翻炒', '加入酱油、糖和水，炖20分钟即可'] },
  { id: 'sd-2', name: '葱烧海参', category: '山东菜', difficulty: 'hard', sales: 2340, ingredients: ['海参', '大葱', '酱油', '蚝油'], steps: ['海参泡发，切块', '大葱切段', '锅中放油，爆香葱段', '加入海参翻炒', '加入酱油和蚝油调味即可'] },
  { id: 'sd-3', name: '糖醋鲤鱼', category: '山东菜', difficulty: 'hard', sales: 3120, ingredients: ['鲤鱼', '白糖', '醋', '番茄酱'], steps: ['鲤鱼处理干净，两面划刀', '用淀粉裹匀', '油烧热，炸至金黄', '锅中放少许油，加入白糖和醋调成酱汁', '倒入炸好的鲤鱼翻炒均匀即可'] },
  { id: 'sd-4', name: '锅塌豆腐', category: '山东菜', difficulty: 'medium', sales: 2670, ingredients: ['豆腐', '鸡蛋', '面粉', '葱'], steps: ['豆腐切块', '鸡蛋打散，加入面粉调成糊', '豆腐裹上面糊', '平底锅放油，煎至两面金黄', '加入葱花即可'] },
  { id: 'db-1', name: '锅包肉', category: '东北菜', difficulty: 'hard', sales: 4120, ingredients: ['猪里脊肉', '鸡蛋', '淀粉', '白糖', '醋'], steps: ['猪里脊切条，用盐、料酒腌制', '鸡蛋加淀粉调成糊，裹在肉条上', '油烧热，将肉条炸至金黄捞出', '锅中放少许油，加入白糖和醋调成酱汁', '倒入炸好的肉条翻炒均匀即可'] },
  { id: 'db-2', name: '地三鲜', category: '东北菜', difficulty: 'medium', sales: 3890, ingredients: ['茄子', '土豆', '青椒', '蒜'], steps: ['茄子、土豆、青椒切块', '土豆和茄子分别炸至金黄', '锅中放油，爆香蒜末', '加入三种蔬菜翻炒', '加入盐和酱油调味即可'] },
  { id: 'db-3', name: '小鸡炖蘑菇', category: '东北菜', difficulty: 'medium', sales: 4560, ingredients: ['鸡肉', '蘑菇', '粉条', '葱姜'], steps: ['鸡肉切块，焯水', '蘑菇泡发', '锅中放油，爆香葱姜', '加入鸡肉翻炒', '加水烧开，加入蘑菇和粉条，炖30分钟即可'] },
  { id: 'db-4', name: '酸菜白肉锅', category: '东北菜', difficulty: 'medium', sales: 3450, ingredients: ['酸菜', '五花肉', '粉丝', '豆腐'], steps: ['五花肉切片', '酸菜切碎', '锅中放水，放入酸菜和五花肉', '煮20分钟，加入粉丝和豆腐再煮5分钟即可'] },
  { id: 'db-5', name: '猪肉炖粉条', category: '东北菜', difficulty: 'medium', sales: 4120, ingredients: ['五花肉', '粉条', '白菜', '葱姜'], steps: ['五花肉切块，焯水', '粉条泡发', '锅中放油，爆香葱姜', '加入五花肉翻炒', '加水烧开，加入粉条和白菜，炖20分钟即可'] },
  { id: 'sx-1', name: '肉夹馍', category: '陕西菜', difficulty: 'medium', sales: 5230, ingredients: ['面粉', '猪肉', '青椒', '香菜'], steps: ['面粉加水和成面团，醒发30分钟', '猪肉炖熟，切碎', '面团分成小剂子，擀成薄饼', '平底锅放油，煎至两面金黄', '切开饼，夹入肉、青椒和香菜即可'] },
  { id: 'sx-2', name: '羊肉泡馍', category: '陕西菜', difficulty: 'hard', sales: 4560, ingredients: ['馍', '羊肉', '粉丝', '木耳', '香菜'], steps: ['馍掰成小块', '羊肉炖汤备用', '锅中加水烧开，下入馍块煮5分钟', '加入羊肉汤、粉丝、木耳', '煮10分钟后撒上香菜即可'] },
  { id: 'sx-3', name: '凉皮', category: '陕西菜', difficulty: 'hard', sales: 4890, ingredients: ['面粉', '黄瓜', '豆芽', '辣椒油'], steps: ['面粉加水和成面团，醒发30分钟', '洗面筋，将淀粉水沉淀', '蒸凉皮', '黄瓜切丝，豆芽焯水', '辣椒油、酱油、醋调成料汁', '凉皮切条，加入配菜和料汁拌匀即可'] },
  { id: 'sx-4', name: '岐山臊子面', category: '陕西菜', difficulty: 'hard', sales: 4120, ingredients: ['面条', '猪肉末', '鸡蛋', '木耳', '黄花菜'], steps: ['猪肉末炒香，加入调料制成臊子', '鸡蛋摊成蛋皮，切丝', '木耳、黄花菜泡发', '面条煮熟捞出', '碗中放入臊子、蛋皮、木耳、黄花菜', '倒入热汤即可'] },
  { id: 'sx-5', name: '油泼面', category: '陕西菜', difficulty: 'medium', sales: 4320, ingredients: ['面条', '葱', '蒜', '辣椒面', '酱油'], steps: ['面条煮熟捞出', '葱切丝，蒜切末', '碗中放入辣椒面、葱花、蒜末、酱油', '淋上热油即可'] },
  { id: 'shanxi-1', name: '过油肉', category: '山西菜', difficulty: 'medium', sales: 3890, ingredients: ['猪里脊肉', '木耳', '黄瓜', '鸡蛋'], steps: ['猪里脊切片，用淀粉腌制', '鸡蛋打散，炒熟备用', '木耳泡发，黄瓜切片', '锅中放油，炒香肉片', '加入木耳、黄瓜和鸡蛋翻炒即可'] },
  { id: 'shanxi-2', name: '刀削面', category: '山西菜', difficulty: 'hard', sales: 5230, ingredients: ['面粉', '猪肉', '青菜', '酱油'], steps: ['面粉加水和成面团，醒发30分钟', '猪肉炖熟，切成丁', '面团放在手中，用刀削入锅中', '煮熟后捞出，加入肉丁和青菜即可'] },
  { id: 'shanxi-3', name: '剔尖', category: '山西菜', difficulty: 'medium', sales: 3450, ingredients: ['面粉', '水', '西红柿', '鸡蛋'], steps: ['面粉加水和成软面团', '西红柿切块，炒制成卤', '面团放在碗边，用筷子剔入锅中', '煮熟后捞出，浇上卤即可'] },
  { id: 'shanxi-4', name: '猫耳朵', category: '山西菜', difficulty: 'easy', sales: 2890, ingredients: ['面粉', '水', '西红柿', '鸡蛋'], steps: ['面粉加水和成面团，醒发20分钟', '面团分成小剂子，搓成猫耳朵形状', '煮熟后捞出', '西红柿切块，炒制成卤', '浇在猫耳朵上即可'] }
]

export function getDishById(id) {
  return dishes.find(dish => dish.id === id)
}

export function getDishesByCategory(category) {
  return dishes.filter(dish => dish.category === category)
}
