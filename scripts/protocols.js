/* ==========================================================================
   Clínica Carolina Baim — Dados Clínicos, Protocolos, Antes & Depois, FAQ
   ========================================================================== */

export const CLINIC_INFO = {
  name: 'Clínica Carolina Baim',
  practitioner: 'Dra. Carolina Baim',
  credential: 'Biomédica Esteta · CRBM 59984',
  tagline: 'Naturalidade, equilíbrio e beleza sem exageros',
  phoneDisplay: '(11) 99693-5563',
  whatsappNumber: '5511996935563',
  instagramHandle: '@dra.carolinabaim',
  instagramUrl: 'https://www.instagram.com/dra.carolinabaim/',
  addressLine1: 'R. Purpurina, 514 — Sumarezinho',
  addressLine2: 'Vila Madalena / Pinheiros, São Paulo - SP · CEP 05435-030',
  plusCode: 'C8W4+3R Sumarezinho, São Paulo - SP',
  googleMapsUrl:
    'https://www.google.com/maps/place/Cl%C3%ADnica+Carolina+Baim/@-23.5548147,-46.6929933,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce57fee8dfcacd:0xebb77cfa92385bc1!8m2!3d-23.5548147!4d-46.6929933!16s%2Fg%2F11vsd42cqf?entry=ttu',
  rating: '5,0',
  reviewCount: 42,
  coords: { lat: -23.5548147, lng: -46.6929933 },
  hours: [
    { dayIndex: 1, day: 'Segunda-feira', label: 'Fechado', open: null, close: null },
    { dayIndex: 2, day: 'Terça-feira', label: '09:00 – 19:00', open: '09:00', close: '19:00' },
    { dayIndex: 3, day: 'Quarta-feira', label: '09:00 – 19:00', open: '09:00', close: '19:00' },
    { dayIndex: 4, day: 'Quinta-feira', label: '09:00 – 19:00', open: '09:00', close: '19:00' },
    { dayIndex: 5, day: 'Sexta-feira', label: '09:00 – 19:00', open: '09:00', close: '19:00' },
    { dayIndex: 6, day: 'Sábado', label: '09:00 – 18:00', open: '09:00', close: '18:00' },
    { dayIndex: 0, day: 'Domingo', label: 'Fechado', open: null, close: null },
  ],
};

export const PROTOCOL_CATEGORIES = [
  { id: 'all', label: 'Todos os Protocolos', icon: 'apps' },
  { id: 'laser', label: 'Laser & Tecnologia', icon: 'flare' },
  { id: 'injectables', label: 'Injetáveis Naturais', icon: 'spa' },
  { id: 'skin', label: 'Pele, Melasma & Acne', icon: 'dermatology' },
  { id: 'biostimulators', label: 'Colágeno & Firmeza', icon: 'auto_awesome' },
];

export const PROTOCOLS = [
  {
    id: 'lavieen-glass-skin',
    category: 'laser',
    badge: 'Destaque da Clínica',
    eyebrow: 'PROTOCOLO AUTORAL · LASER THULIUM WONTECH',
    title: 'Protocolo Lavieen Glass Skin',
    shortDesc:
      'Tecnologia a laser não-ablativa para textura refinada, poros menos aparentes, viço imediato e uniformização do tom da pele.',
    duration: '40 min',
    recovery: 'Mínima (24–48h)',
    comfort: 'Anestésico tópico + resfriamento',
    image: 'assets/images/atendimento-cb-wall.jpg',
    icon: 'flare',
    tone: 'primary',
    indications: [
      'Poros dilatados e textura irregular',
      'Linhas finas e perda de viço facial',
      'Manchas solares, melasma e cicatrizes leves de acne',
      'Pacientes que buscam efeito "BB Cream natural" sem downtime longo',
    ],
    approach:
      'O Laser Lavieen atua na junção dermoepidérmica estimulando renovação celular e neocolagênese com precisão modulada pela Dra. Carolina Baim para o seu fototipo.',
    whatsappText:
      'Olá, Dra. Carolina! Gostaria de saber mais e agendar uma avaliação para o Protocolo Lavieen Glass Skin.',
  },
  {
    id: 'labios-naturais',
    category: 'injectables',
    badge: 'Favorito das Pacientes',
    eyebrow: 'HARMONIZAÇÃO DELICADA',
    title: 'Preenchimento Labial Natural',
    shortDesc:
      'Hidratação profunda, contorno definido e volume proporcional à sua anatomia — respeitando o movimento e a suavidade do sorriso.',
    duration: '45 min',
    recovery: 'Leve edema por 48h',
    comfort: 'Bloqueio confortável · Mínima dor',
    image: 'assets/images/results/labios-3.jpg',
    icon: 'favorite',
    tone: 'secondary',
    indications: [
      'Lábios ressecados ou com perda de contorno ao longo do tempo',
      'Assimetrias sutis entre lábio superior e inferior',
      'Desejo de realce elegante sem aspecto artificial ou exagerado',
    ],
    approach:
      'Utilizamos ácido hialurônico de reologia macia e técnica delicada, priorizando conforto e proporção facial harmônica.',
    whatsappText:
      'Olá! Tenho interesse no Preenchimento Labial Natural e gostaria de agendar uma avaliação.',
  },
  {
    id: 'toxina-preventiva',
    category: 'injectables',
    badge: 'Resultado Sutil',
    eyebrow: 'REJUVENESCIMENTO PREVENTIVO',
    title: 'Toxina Botulínica Personalizada',
    shortDesc:
      'Suavização de linhas de expressão na testa, glabela e área dos olhos preservando a expressividade natural do olhar.',
    duration: '30 min',
    recovery: 'Retorno imediato',
    comfort: 'Aplicação rápida e delicada',
    image: 'assets/images/atendimento-consulta.jpg',
    icon: 'face_retouching_natural',
    tone: 'tertiary',
    indications: [
      'Linhas dinâmicas na testa, entre as sobrancelhas e "pés de galinha"',
      'Prevenção de marcas estáticas profundas',
      'Leve abertura e descanso do olhar com naturalidade',
    ],
    approach:
      'Mapeamento muscular individualizado em repouso e em movimento, calibrando cada ponto para um rosto descansado — nunca congelado.',
    whatsappText:
      'Olá! Gostaria de agendar uma avaliação para Toxina Botulínica Personalizada.',
  },
  {
    id: 'tratamento-olheiras',
    category: 'injectables',
    badge: 'Olhar Descansado',
    eyebrow: 'REJUVENESCIMENTO PERIOCULAR',
    title: 'Tratamento & Preenchimento de Olheiras',
    shortDesc:
      'Suavização da profundidade da goteira lacrimal, melhora da sombra abaixo dos olhos e revitalização da pele delicada das pálpebras.',
    duration: '40 min',
    recovery: 'Retorno no mesmo dia',
    comfort: 'Microcânula atraumática e segura',
    image: 'assets/images/results/olheiras-1.jpg',
    icon: 'visibility',
    tone: 'primary',
    indications: [
      'Olheiras profundas com formação de sombra e aspecto de cansaço constante',
      'Perda de suporte na região infraorbital (abaixo dos olhos)',
      'Flacidez fina e linhas ao redor dos olhos',
    ],
    approach:
      'Avaliação anatômica criteriosa para repor suporte estrutural com ácido hialurônico específico para a região periocular ou protocolos de bioestimulação local.',
    whatsappText:
      'Olá, Dra. Carolina! Gostaria de agendar uma avaliação para Tratamento de Olheiras.',
  },
  {
    id: 'melasma-uniformizacao',
    category: 'skin',
    badge: 'Cuidado Clínico',
    eyebrow: 'GERENCIAMENTO DÉRMICO',
    title: 'Protocolo Clareador & Melasma',
    shortDesc:
      'Estratégia combinada e segura para controle de hiperpigmentação, manchas pós-inflamatórias e recuperação da barreira cutânea.',
    duration: '50 min',
    recovery: 'Zero a leve descamação',
    comfort: 'Protocolo calmante e indolor',
    image: 'assets/images/clinic-skincare.jpg',
    icon: 'dermatology',
    tone: 'secondary',
    indications: [
      'Melasma epidérmico e misto',
      'Manchas solares e hiperpigmentação pós-acne',
      'Peles sensíveis que precisam de clareamento sem efeito rebote',
    ],
    approach:
      'Associamos ativos despigmentantes de alta performance, laser modulado e linha de fotoproteção Carolina Baim para controle duradouro.',
    whatsappText:
      'Olá! Gostaria de saber mais sobre o Protocolo Clareador & Melasma com a Dra. Carolina.',
  },
  {
    id: 'bioestimuladores-colageno',
    category: 'biostimulators',
    badge: 'Firmeza & Textura',
    eyebrow: 'BANCO DE COLÁGENO & PELE',
    title: 'Bioestimuladores & Textura Dérmica',
    shortDesc:
      'Estímulo gradual e fisiológico das fibras de sustentação da pele, devolvendo firmeza, suavizando cicatrizes e redefinindo contornos.',
    duration: '50 min',
    recovery: 'Retorno rápido',
    comfort: 'Anestesia local integrada',
    image: 'assets/images/protocol-facial.jpg',
    icon: 'auto_awesome',
    tone: 'tertiary',
    indications: [
      'Flacidez facial leve a moderada e perda de densidade dérmica',
      'Cicatrizes atróficas de acne e poros dilatados',
      'Prevenção do envelhecimento estrutural a partir dos 28–30 anos',
    ],
    approach:
      'Aplicação em planos anatômicos precisos combinada a tecnologias como Lavieen e Ultrafocus para despertar o próprio colágeno da paciente.',
    whatsappText:
      'Olá! Gostaria de agendar uma consulta sobre Bioestimuladores de Colágeno e Textura.',
  },
];

export const RESULT_CATEGORIES = [
  { id: 'all', label: 'Todos os Resultados', icon: 'grid_view' },
  { id: 'labios', label: 'Preenchimento Labial', icon: 'favorite' },
  { id: 'botox', label: 'Toxina Botulínica (Botox)', icon: 'face_retouching_natural' },
  { id: 'olheiras', label: 'Tratamento de Olheiras', icon: 'visibility' },
];

export const BEFORE_AFTER_RESULTS = [
  {
    id: 'res-labios-1',
    category: 'labios',
    badge: 'Preenchimento Labial',
    title: 'Contorno, Hidratação & Volume Natural',
    subtitle: 'Realce delicado do arco do cupido e definição proporcional · CRBM 59984',
    image: 'assets/images/results/labios-1.jpg',
  },
  {
    id: 'res-botox-1',
    category: 'botox',
    badge: 'Toxina Botulínica',
    title: 'Suavização de Glabela & Fronte',
    subtitle: 'Descanso da expressão preservando a naturalidade do olhar · CRBM 59984',
    image: 'assets/images/results/botox-1.jpg',
  },
  {
    id: 'res-olheiras-1',
    category: 'olheiras',
    badge: 'Olheiras',
    title: 'Revitalização da Região Infraorbital',
    subtitle: 'Redução da profundidade e sombra do olhar cansado · CRBM 59984',
    image: 'assets/images/results/olheiras-1.jpg',
  },
  {
    id: 'res-labios-2',
    category: 'labios',
    badge: 'Preenchimento Labial',
    title: 'Projeção Sutil & Simetria Labial',
    subtitle: 'Perfil harmônico e brilho saudável com ácido hialurônico macio · CRBM 59984',
    image: 'assets/images/results/labios-2.jpg',
  },
  {
    id: 'res-botox-2',
    category: 'botox',
    badge: 'Toxina Botulínica',
    title: 'Controle de Linhas Dinâmicas',
    subtitle: 'Pele lisa ao movimento sem efeito congelado · CRBM 59984',
    image: 'assets/images/results/botox-2.jpg',
  },
  {
    id: 'res-olheiras-2',
    category: 'olheiras',
    badge: 'Olheiras',
    title: 'Suavização do Sulco Lacrimal',
    subtitle: 'Transição suave entre pálpebra inferior e face média · CRBM 59984',
    image: 'assets/images/results/olheiras-2.jpg',
  },
  {
    id: 'res-labios-3',
    category: 'labios',
    badge: 'Preenchimento Labial',
    title: 'Revitalização & Efeito Gloss Natural',
    subtitle: 'Recuperação do viço e maciez labial · CRBM 59984',
    image: 'assets/images/results/labios-3.jpg',
  },
  {
    id: 'res-botox-3',
    category: 'botox',
    badge: 'Toxina Botulínica',
    title: 'Prevenção de Rugas Frontais',
    subtitle: 'Equilíbrio muscular e arqueamento elegante das sobrancelhas · CRBM 59984',
    image: 'assets/images/results/botox-3.jpg',
  },
  {
    id: 'res-olheiras-3',
    category: 'olheiras',
    badge: 'Olheiras',
    title: 'Rejuvenescimento do Olhar',
    subtitle: 'Melhora da qualidade dérmica e suporte periocular · CRBM 59984',
    image: 'assets/images/results/olheiras-3.jpg',
  },
  {
    id: 'res-labios-4',
    category: 'labios',
    badge: 'Preenchimento Labial',
    title: 'Redefinição de Contorno & Filtro',
    subtitle: 'Harmonia labiofacial sem exageros · CRBM 59984',
    image: 'assets/images/results/labios-4.jpg',
  },
  {
    id: 'res-botox-4',
    category: 'botox',
    badge: 'Toxina Botulínica',
    title: 'Harmonização do Terço Superior',
    subtitle: 'Suavização da expressão de braveza na glabela · CRBM 59984',
    image: 'assets/images/results/botox-4.jpg',
  },
  {
    id: 'res-olheiras-4',
    category: 'olheiras',
    badge: 'Olheiras',
    title: 'Harmonização Periocular Masculina & Feminina',
    subtitle: 'Resultado discreto e olhar descansado · CRBM 59984',
    image: 'assets/images/results/olheiras-4.jpg',
  },
];

export const GOOGLE_REVIEW_TOPICS = [
  { label: 'Nota 5,0 no Google', count: '42 avaliações', icon: 'star' },
  { label: 'Preço justo', count: '4 menções', icon: 'payments' },
  { label: 'Equipe acolhedora', count: '3 menções', icon: 'diversity_1' },
  { label: 'Ambiente leve e limpo', count: '3 menções', icon: 'eco' },
  { label: 'Laser Lavieen', count: 'Protocolo citado', icon: 'flare' },
  { label: 'Preenchimento Labial & Botox', count: 'Resultados naturais', icon: 'spa' },
];

export const TESTIMONIALS = [
  {
    author: 'Mariana S.',
    context: 'Avaliação Google Maps · Preenchimento Labial & Botox',
    quote:
      'Atendimento extremamente delicado e acolhedor do começo ao fim. A Dra. Carolina tem a mão muito leve, explicou cada etapa e o resultado ficou exatamente natural, sem exageros.',
    rating: 5,
  },
  {
    author: 'Beatriz L.',
    context: 'Avaliação Google Maps · Protocolo Lavieen',
    quote:
      'Ambiente impecável, super limpo e tranquilo na Vila Madalena. Fiz o Lavieen e amei o viço da pele já na primeira semana. Preço muito justo pela qualidade e carinho da equipe.',
    rating: 5,
  },
  {
    author: 'Camila R.',
    context: 'Avaliação Google Maps · Jornada de Cuidado',
    quote:
      'Você se sente cuidada de verdade. A clínica transmite paz logo na entrada, procedimento praticamente indolor e acompanhamento atencioso no pós. Recomendo de olhos fechados.',
    rating: 5,
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Como funciona a primeira avaliação com a Dra. Carolina Baim?',
    answer:
      'Na avaliação inicial, analisamos qualidade de pele, estrutura facial, histórico de cuidados e seus desejos reais. A partir dessa escuta, desenhamos um plano personalizado — respeitando seu tempo, orçamento e priorizando sempre a naturalidade.',
  },
  {
    question: 'Os procedimentos são dolorosos?',
    answer:
      'Nosso maior cuidado é proporcionar uma experiência tranquila e confortável. Utilizamos anestésicos tópicos de alta performance, técnicas delicadas com microcânulas e pausas sempre que necessário — ponto frequentemente elogiado nas nossas 42 avaliações 5 estrelas.',
  },
  {
    question: 'Vou ficar com o rosto inchado ou com aspecto artificial?',
    answer:
      'Não. Nossa filosofia é "beleza sem exageros": trabalhamos com doses graduais, foco em qualidade de pele e respeito absoluto às suas características únicas para que você pareça descansada e radiante.',
  },
  {
    question: 'Qual o tempo de recuperação do Laser Lavieen?',
    answer:
      'O Lavieen oferece excelente custo-benefício de recuperação: a pele pode ficar levemente rosada nas primeiras 12 a 24 horas e apresentar uma micropelícula sutil nos dias seguintes, permitindo retomar a rotina com protetor solar.',
  },
  {
    question: 'Onde a clínica está localizada e quais os horários?',
    answer:
      'Estamos na Rua Purpurina, 514 — Sumarezinho (região da Vila Madalena / Pinheiros), São Paulo. Atendemos de terça a sexta-feira das 09h às 19h, e aos sábados das 09h às 18h, com horário marcado.',
  },
];
