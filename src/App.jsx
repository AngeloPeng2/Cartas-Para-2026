import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Lock, Mail, Calendar, Sparkles, ChevronRight, Gift, Music, Star, Clock, Eye, EyeOff } from 'lucide-react';

// Componente para a animação da chuva de corações
const HeartRain = ({ active }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (active) {
      const newHearts = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.5,
      }));
      setHearts(newHearts);
      const timer = setTimeout(() => setHearts([]), 7000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[110] overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-rose-400 animate-heart-fall"
          style={{
            left: `${heart.left}%`,
            top: '-5%',
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState('all');
  
  // MODO REAL POR PADRÃO: testMode começa como false
  const [testMode, setTestMode] = useState(false);
  const [isRaining, setIsRaining] = useState(false);
  
  // Contador para o segredo do modo teste
  const [secretClicks, setSecretClicks] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  // Função para ativar o modo teste secretamente (5 cliques)
  const handleSecretToggle = () => {
    setSecretClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setTestMode(!testMode);
        return 0;
      }
      return newCount;
    });
    // Resetar cliques se demorar muito entre eles
    setTimeout(() => setSecretClicks(0), 3000);
  };

  const lettersData = useMemo(() => {
    const letters = [];

    const monthlyGroups = [
      { month: 0, texts: [
        { title: "Bem-vinda ao nosso ano", text: "Feliz Ano Novo, meu bem! Este site é o meu diário de amor para você. Em 2026, meu maior objetivo é te fazer sentir a mulher mais amada do mundo todos os dias. Mesmo com altos e baixos quero estar com você em todos os momentos sempre evoluindo juntos e por isso você é minha melhor escolha." },
        { title: "Vale - Massagem Relaxante", text: "Mesmo de recesso sei que sua rotina é intensa e seu esforço é muito. Hoje, eu quero ser o seu descanso. Este cupom vale 30 minutos de massagem para você desligar do mundo e focar só no meu carinho." },
        { title: "Desafio - Nossa primeira foto", text: "Olhar para onde começamos me faz perceber o quanto crescemos. Desafio: Poste um Story com nossa primeira foto juntos e uma legenda romântica, capricha" },
        { title: "Sua força me inspira", text: "Admiro a forma como você leva a vida seja nos momentos bons ou ruins. Sua determinação é tudo e ver você conquistar seus espaços me enche de um orgulho que nem cabe no peito. Você é grandiosa meu amor, planos maiores te aguardam." }
      ]},
      { month: 1, texts: [
        { title: "O brilho do seu olhar", text: "Existe um universo inteiro nos seus olhos. Quando você me olha, sinto que o mundo para. Obrigado por me olhar com tanta doçura e por me fazer sentir amado." },
        { title: "Vale - Jantar Especial", text: "Você merece o mundo, mas hoje quero começar te dando uma noite perfeita. Este cupom vale um jantar. Eu cuido de tudo, você só precisa ser a estrela que você sempre é." },
        { title: "Desafio - 3 Planos para o ano", text: "Eu quero realizar todos os seus sonhos. Desafio: Me mande um áudio dizendo 3 coisas que você quer muito que a gente faça juntos este ano. Vou guardar cada uma como uma missão." },
        { title: "O som da felicidade", text: "Sua risada é o meu refúgio e o som mais doce que conheço. Ela cura qualquer cansaço e renova as minhas forças. Sorria sempre, pois o seu sorriso é o que me move todos os dias." }
      ]},
      { month: 2, texts: [
        { title: "Minha melhor amiga", text: "Antes de ser minha namorada, você se tornou meu porto seguro. Amo que posso falar sobre tudo com você, desde as maiores bobagens até os planos mais sérios. Nossa amizade é o alicerce do nosso amor." },
        { title: "Vale - Noite de Filmes", text: "Pipoca, cobertor e o seu filme favorito. Este cupom garante uma noite inteira de aconchego onde eu sou o seu travesseiro e a pipoca é por minha conta!" },
        { title: "Desafio - O restaurante inédito", text: "Vamos sair da rotina? Desafio: Hoje a escolha do jantar é sua, mas tem que ser um lugar onde nunca fomos. Vamos criar uma memória nova hoje?" },
        { title: "O futuro ao seu lado", text: "Às vezes me pego imaginando a gente daqui a 10, 20 anos. E em todas as cenas, você está lá, ainda mais linda. Mal posso esperar para envelhecer ao seu lado." }
      ]},
      { month: 3, texts: [
        { title: "Vale - 'Você tem razão'", text: "Use com moderação! Este cupom encerra qualquer discussão boba dando a vitória a você. Porque, no fundo, você quase sempre tem razão mesmo." },
        { title: "Desafio - Papel de Parede", text: "Quero ver seu rosto toda vez que eu ligar o celular. Desafio: escolha uma foto nova e coloque como meu papel de parede!" },
        { title: "Minha melhor cena", text: "Nossa história é aquele filme que eu assistiria em looping, sem nunca me cansar. Entre todos os enredos do mundo, o nosso é o meu favorito. Obrigado por ser a protagonista perfeita e transformar minha vida em um sucesso absoluto." },
        { title: "O que aprendi com você", text: "Você me ensinou a ser mais paciente e a enxergar a beleza nas pequenas coisas. Sou um homem muito melhor desde que você entrou na minha vida. Obrigado por tudo" }
      ]},
      { month: 4, texts: [
        { title: "Seu coração é ouro", text: "Amo a forma como você cuida de quem ama. Sua empatia e sua bondade são raras. Ter alguém com um coração como o seu ao lado é o maior privilégio da minha vida." },
        { title: "Vale - Café da Manhã na Cama", text: "Acorde com calma. Este cupom vale um banquete servido na cama, preparado com todo o meu amor para você começar o dia sentindo-se a rainha que é." },
        { title: "Desafio - O Post-it do amor", text: "Pequenos gestos mudam o dia. Desafio: Escreva algo que você ama em mim em um papelzinho e esconda na minha mochila ou carteira para eu achar depois." },
        { title: "Nossa primeira conversa", text: "Lembrei hoje das nossas primeiras mensagens. Quem diria que aquele convite para F1 se tornaria o 'eu te amo' mais sincero da minha vida? Obrigado por não ter desistido de mim." }
      ]},
      { month: 5, texts: [
        { title: "Por que é você", text: "Eu poderia procurar pelo mundo todo e nunca encontraria alguém que se encaixasse tão bem em mim. Você me completa de um jeito que eu nem sabia que era possível." },
        { title: "Minha declaração eterna", text: "Feliz Dia dos Namorados para a dona do meu coração! Hoje o mundo celebra o amor, mas eu celebro a sorte de ter encontrado o amor na sua forma mais linda: você. Obrigado por ser minha namorada, minha princesa e minha parceira de todas as horas.", customDate: "2026-06-12" },
        { title: "Desafio - Foto atual com trilha sonora", text: "Quero celebrar o 'nós' de hoje. Desafio: Tire uma foto nossa agora com a música que você acha que mais combina com a gente neste momento." },
        { title: "Vale - Presente Surpresa", text: "Não tem texto hoje, tem ação! Me envie um print desta tela e você receberá um mimo físico que comprei especial para você." }
      ]},
      { month: 6, texts: [
        { title: "Vale - Dia Off", text: "Hoje eu sou o seu assistente pessoal. Lavar louça? Eu faço. Compras? Eu vou. Você só precisa sentar, relaxar e ser paparicada o dia todo." },
        { title: "Desafio - Playlist", text: "Música é memória. Desafio: Crie uma playlist com 5 músicas que te fazem lembrar de mim e me mande. Quero ouvir o que você sente através dos sons." },
        { title: "Sua beleza natural", text: "Amo você toda produzida, mas a minha versão favorita é você acordando, com o cabelo bagunçado e esse sorriso sonolento. Você é linda em todas as suas versões." },
        { title: "10 coisas que eu amo em você", text: "1- Sua voz, principalmente quando diz o meu nome.\n2- Seu cheiro, que fica guardado na minha memória.\n3- Sua parceria, por nunca me deixar caminhar sozinho.\n4- Sua risada, a trilha sonora favorita dos meus dias.\n5- Seu senso de humor, que transforma qualquer problema em algo leve.\n6- O brilho nos seus olhos quando você fala de algo que ama.\n7- Sua paciência e a forma doce como você cuida de mim.\n8- Suas mãos na minha, encaixando perfeitamente.\n9- Sua coragem de ser exatamente quem você é.\n10- O seu coração, que é o lugar mais bonito que eu já conheci.\n\nCada detalhe seu completa o meu mundo de uma forma única." }
      ]},
      { month: 7, texts: [
        { title: "Evoluindo juntos", text: "É lindo ver como nosso amor amadureceu. Passamos por momentos difíceis e mesmo assim resistimos juntos. Obrigado por crescer ao meu lado." },
        { title: "Vale - Doce Favorito", text: "A vida é mais doce com você, mas hoje eu quero literalmente adoçar seu dia. Este cupom vale o seu doce favorito entregue em mãos por mim." },
        { title: "Desafio - Recriando foto", text: "Vamos ver o quanto mudamos? Desafio: Escolha uma foto antiga nossa e vamos tentar recriar a mesma hoje. O amor é o mesmo, mas estamos ainda melhores." },
        { title: "Minha paz", text: "O mundo (capitalista) é cansativo e confuso, mas quando estou com você, tudo se acalma. Você é a minha paz, o meu equilíbrio e o meu lugar seguro. Te amo." }
      ]},
      { month: 8, texts: [
        { title: "Sua mente é brilhante", text: "Amo ouvir você falar sobre o que gosta. você me fascina e eu poderia passar horas apenas te escutando explicar o mundo. Você é incrível, não se esqueça disso." },
        { title: "Vale - uma Aventura", text: "Vamos sair da mesmice? Este cupom vale um passeio surpresa planejado. Pode ser uma trilha, um parque ou uma viagem curta. Prepare-se!" },
        { title: "Desafio - Segredo bobo", text: "Quero te conhecer cada vez mais. Desafio: Me conte hoje um sonho ou desejo 'bobo' que você nunca contou para ninguém. Prometo guardar com todo carinho." },
        { title: "Tenho orgulho de você", text: "Ver você vencendo seus desafios me dá uma alegria imensa. Eu sou o seu fã número 1 e estarei sempre na primeira fila aplaudindo suas conquistas e te apoiando." }
      ]},
      { month: 9, texts: [
        { title: "Vale - Abraço Infinito", text: "Para aqueles dias em que nada parece dar certo. Este cupom te dá direito a um abraço apertado que só termina quando você se sentir bem de novo." },
        { title: "Desafio - chef por um dia", text: "Vamos para a cozinha! Desafio: Você escolhe uma receita nova e eu serei seu ajudante oficial. Vamos ver se a gente consegue." },
        { title: "Nossa brisa perfeita", text: "O que a gente tem é raro, é puro e tem a conexão mais natural do mundo. Nosso amor é como aquela cannabis da melhor qualidade: traz paz, eleva a alma e faz tudo ficar mais colorido. Você é a minha heroína favorita e a minha melhor companhia, TE AMOOO." },
        { title: "Nossas gafes", text: "Lembrei hoje daquela vez que você peidou em umas das nossas primeiras conchinhas juntos kakakakak. Rir com você é o que mantém minha alma jovem." }
      ]},
      { month: 10, texts: [
        { title: "Obrigado por existir", text: "Às vezes fico pensando na sorte que tive em te encontrar entre bilhões de pessoas. Obrigado por ter cruzado o meu caminho e decidido ficar." },
        { title: "Vale - Jantar Caseiro", text: "Hoje o chef sou eu. Este cupom vale um jantar completo feito por mim, com direito a mesa posta e a sua playlist favorita de fundo." },
        { title: "Desafio - O beijo", text: "A correria não pode roubar nosso romance. Desafio: Hoje, toda vez que a gente se encontrar, o beijo tem que durar pelo menos 10 segundos. Combinado?" },
        { title: "Planejando as férias", text: "Onde você quer levar esse nosso amor nas próximas férias? Vamos começar a sonhar com o nosso próximo destino. Com você, eu vou para qualquer lugar." }
      ]},
      { month: 11, texts: [
        { title: "O que vivemos em 2026", text: "Olho para trás e vejo um ano cheio de memórias lindas. De todas as coisas boas que me aconteceu este ano, ter você foi a melhor delas, disparado." },
        { title: "Vale - Beijo de Cinema", text: "Aquele beijo de parar o tempo, com direito a mão na nuca e tudo o que você gosta. Para ser usado no momento em que você mais desejar." },
        { title: "Desafio - Carta para o futuro", text: "Vamos guardar nosso amor em uma cápsula do tempo? Desafio: Escreva 3 linhas para a gente ler daqui a um ano e me entregue. Eu vou guardar no meu lugar secreto." },
        { title: "Para sempre nós", text: "Chegamos à última carta do ano, mas estamos apenas no começo da nossa história. Que venha 2027, 2028... eu te amo cada dia mais. Obrigado por ser minha todos esses dias, te amo e sempre amarei.", customDate: "2026-12-31" }
      ]}
    ];

    let weekCounter = 1;
    monthlyGroups.forEach(group => {
      group.texts.forEach((item, index) => {
        let releaseDate;
        if (item.customDate) {
          releaseDate = new Date(item.customDate + "T00:00:00");
        } else {
          const day = (index * 7) + 1;
          releaseDate = new Date(2026, group.month, day);
        }
        letters.push({
          id: `week-${weekCounter}`,
          type: 'weekly',
          title: `Semana ${weekCounter} - ${item.title}`,
          content: item.text,
          date: releaseDate,
          dateString: releaseDate.toLocaleDateString('pt-BR'),
          isSpecial: false
        });
        weekCounter++;
      });
    });

    const monthlyExtras = [
      { 
        m: 0, 
        t: "Onde o tempo ganha sentido", 
        c: "Meu amor, hoje celebramos 1 ano e 4 meses. Olho para trás e parece que te conheço de outras vidas, mas ao mesmo tempo, sinto aquela friozinho na barriga de quem acabou de se apaixonar. Estar com você é como encontrar o ritmo perfeito de uma música que eu quero ouvir para sempre. Obrigado por ser minha parceria nesse início de 2026. Que a gente continue escrevendo nossa história com a mesma intensidade do primeiro dia.", 
        label: "1 ano e 4 meses" 
      },
      { 
        m: 1, 
        t: "A paz que eu encontrei em você", 
        c: "1 ano e 5 meses. Sabe o que eu mais amo em nós? É a segurança de saber que, não importa o quão dificil seja os dias, o seu abraço é o meu conforto e a minha paz. Você me transforma em alguém melhor sem fazer esforço, apenas sendo exatamente quem você é. Cada dia ao seu lado é um aprendizado sobre paciência, doçura e entrega. Eu te amo cada vez mais.", 
        label: "1 ano e 5 meses" 
      },
      { 
        m: 2, 
        t: "Meio ano de um novo ciclo", 
        c: "Hoje fazemos 1 ano e 6 meses. É incrível pensar em tudo o que já superamos e em todas as risadas que compartilhamos até aqui. Você não é apenas o meu amor, você é simplismente TUDO para mim. Amo a forma como a gente se entende no olhar e como o nosso 'nós' se tornou a coisa mais preciosa da minha vida. Feliz metade de mais um ano de namoro, minha princesa!", 
        label: "1 ano e 6 meses" 
      },
      { 
        m: 3, 
        t: "O brilho que você trouxe aos meus dias", 
        c: "1 ano e 7 meses. Passamos pelo seu aniversário este mês, e celebrar a sua vida me fez refletir ainda mais sobre a sorte de te ter como namorada. Você é luz pura. Meu bem sua beleza, interna e externa, me deixa sem fôlego todos os dias. Obrigado por escolher dividir a sua luz comigo por mais esse mês. Eu sou completamente fascinado por você.", 
        label: "1 ano e 7 meses" 
      },
      { 
        m: 4, 
        t: "Construindo o nosso paraíso", 
        c: "Hoje completamos 1 ano e 8 meses. Olho para nós e vejo um alicerce cada vez mais forte. Amo planejar o futuro com você, desde a viagem do próximo mês até a casa que um dia será nossa. Obrigado por ser tão dedicada ao que temos. Cada detalhe seu é um motivo a mais para eu querer ficar com você para sempre.", 
        label: "1 ano e 8 meses" 
      },
      { 
        m: 5, 
        t: "Além das datas, o sentimento", 
        c: "1 ano e 9 meses. Acabamos de passar pelo Dia dos Namorados, mas o dia 20 continua sendo o meu favorito. É o nosso marco real, o dia em que o meu destino se entrelaçou ao seu de vez. Obrigado por ser o meu porto seguro e por me mostrar que o amor de verdade não é perfeito, mas é real e vale cada segundo. Meu coração bate no ritmo do seu.", 
        label: "1 ano e 9 meses" 
      },
      { 
        m: 6, 
        t: "Contagem regressiva para o nosso marco", 
        c: "1 ano e 10 meses. Estamos chegando perto de uma marca linda, mas hoje quero focar no agora. Amo como a gente se diverte com pouco, como um filme se torna o melhor evento do mundo se eu tiver você do lado. Você é a minha melhor companhia e a dona dos meus pensamentos mais bonitos. Obrigado por mais um mês de puro amor.", 
        label: "1 ano e 10 meses" 
      },
      { 
        m: 7, 
        t: "Na véspera do nosso grande dia", 
        c: "1 ano e 11 meses. No mês que vem, nossa história completa um novo capítulo gigante, mas hoje meu peito transborda gratidão por este último mês. Você me faz sentir vivo, me faz querer evoluir e me dá o carinho que eu sempre sonhei. Quase dois anos... e eu ainda sinto que estou apenas começando a te amar o tanto que você merece.", 
        label: "1 ano e 11 meses" 
      },
      { 
        m: 8, 
        t: "24 meses, 730 dias e uma eternidade pela frente", 
        c: "Meu amor, hoje completamos 2 anos. 730 dias desde que decidimos que seríamos um do outro. Dois anos de aprendizado, de amadurecimento e de uma felicidade que eu nunca achei que fosse possível. Vinte e quatro meses escolhendo você todos os dias, e se eu pudesse voltar no tempo, te escolheria mil vezes mais rápido.\n\nNesses dois anos, você viu minhas melhores e piores versões, e em cada uma delas, você me amou. Você transformou minha rotina em aventura e meus medos em coragem. Construímos uma cumplicidade que eu achei que só existia em filmes. Olho para trás e vejo o quanto amadurecemos, o quanto aprendemos um com o outro e o quanto o nosso amor se tornou algo único.\n\nVocê é a mulher da minha vida. Obrigado por esses 2 anos de risadas, de beijos, de mãos dadas e de muito amor. Feliz aniversário de 2 anos para nós! Que esse seja apenas o prefácio de uma história que nunca terá fim. Eu te amo infinitamente.\n\n[CUPOM MASTER]: Vale uma viagem ou um jantar inesquecível (escolha do casal).\n[DESAFIO]: Escreva em um papel onde você quer que a gente esteja quando completarmos 3 anos. Vamos fazer de tudo para que estejamos lá dia 20/09/2027", 
        label: "🏆 2 ANOS" 
      },
      { 
        m: 9, 
        t: "O início do nosso terceiro ano", 
        c: "Hoje celebramos 2 anos e 1 mês. Entramos em uma nova fase, e o que eu mais sinto é empolgação. Empolgação para descobrir novas coisas sobre você, para te beijar como se fosse a primeira vez e para continuar sendo o homem que vai te apoiar em tudo. O 'para sempre' começou a ser construído lá atrás, e cada dia 20 é um tijolo a mais nesse castelo.", 
        label: "2 anos e 1 mês" 
      },
      { 
        m: 10, 
        t: "2 anos e 2 meses", 
        c: "2 anos e 2 meses. O tempo pode passar, os anos podem mudar, mas o jeito que eu te olho nunca vai mudar. Você continua sendo a garota que faz meu coração disparar. Obrigado por não deixar a chama apagar e por ser tão intensa e verdadeira comigo. Sou grato por cada segundo desses 26 meses.", 
        label: "2 anos e 2 meses" 
      },
      { 
        m: 11, 
        t: "Fechando o ano no seu abraço", 
        c: "2 anos e 3 meses. Estamos terminando mais um ano, mas o nosso calendário particular está a todo vapor. Olho para este 2026 e vejo que o dia 20 foi o meu farol em todos os meses. Obrigado por ter sido a melhor parte do meu ano e por ser a melhor parte de mim. Que venha 2027, porque com você, qualquer ano é o melhor da minha vida.", 
        label: "2 anos e 3 meses" 
      },
    ];

    monthlyExtras.forEach((item) => {
      const releaseDate = new Date(2026, item.m, 20);
      letters.push({
        id: `special-${item.m}`,
        type: 'special',
        title: `Dia 20 - ${item.t}`,
        content: item.c,
        date: releaseDate,
        dateString: releaseDate.toLocaleDateString('pt-BR'),
        isSpecial: true,
        label: item.label
      });
    });

    const bdayDate = new Date('2026-04-11T00:00:00');
    letters.push({
      id: 'birthday',
      type: 'birthday',
      title: "O dia em que o mundo ficou mais bonito",
      content: "Meu amor, hoje o dia é todo seu, mas o presente é meu por poder dividir a vida com você. Olho para você e vejo uma mulher que floresce a cada ano, ficando mais sábia, mais linda e mais inspiradora. Que este novo ciclo te traga tanta alegria quanto você traz para o meu coração. Eu estarei aqui para aplaudir cada uma das suas vitórias. Feliz aniversário, minha Princesa\n\n[CUPOM ESPECIAL]: Vale um desejo qualquer. Peça o que quiser hoje, e eu farei acontecer.\n[DESAFIO]: Hoje você não pode lavar um copo ou se preocupar com nada. Seu único trabalho é ser mimada",
      date: bdayDate,
      dateString: "11 de Abril",
      isSpecial: true
    });

    return letters.sort((a, b) => a.date - b.date);
  }, []);

  const filteredLetters = lettersData.filter(l => filter === 'all' || l.type === filter);

  const handleOpenLetter = (letter) => {
    if (testMode || currentTime >= letter.date) {
      setSelectedLetter(letter);
      setIsRaining(false);
      setTimeout(() => setIsRaining(true), 10);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcf9] text-[#5a4a42] font-serif selection:bg-rose-100 overflow-x-hidden">
      <HeartRain active={isRaining} />

      {testMode && (
        <div className="fixed bottom-4 left-4 z-[60] opacity-50 pointer-events-none">
          <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-[10px] font-sans font-bold">
            MODO TESTE ATIVO
          </span>
        </div>
      )}

      <header className="relative py-10 md:py-16 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div 
            className="absolute top-5 left-5 cursor-pointer pointer-events-auto transition-transform active:scale-90"
            onClick={handleSecretToggle}
          >
            <Heart size={30} fill="currentColor" className={testMode ? "text-amber-500" : ""} />
          </div>
          <div className="absolute bottom-5 right-5"><Sparkles size={30} /></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block mb-3 px-3 py-1 text-[10px] md:text-xs tracking-widest uppercase bg-rose-50 text-rose-400 rounded-full font-sans font-semibold">
            Para Izabela Prado Ferreira
          </span>
          <h1 className="text-3xl md:text-6xl font-light mb-4 text-[#4a3a32] px-2 leading-tight">
            Cartas para <span className="italic text-rose-500">Meu Amor</span>
          </h1>
          <p className="text-sm md:text-lg text-[#8a7a72] max-w-lg mx-auto italic px-4 leading-relaxed">
          Um ano inteiro de carinho, planejado para te fazer sorrir todos os dias.
          </p>
        </div>
      </header>

      <nav className="flex flex-wrap justify-center gap-2 mb-8 px-4 font-sans text-[11px] md:text-sm">
        {['all', 'weekly', 'special', 'birthday'].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all border ${
              filter === f ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white border-rose-100 text-rose-400'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'weekly' ? 'Semanais' : f === 'special' ? 'Dia 20' : 'Aniversário'}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredLetters.map((letter) => {
            const isReleased = currentTime >= letter.date;
            const isUnlocked = testMode || isReleased;

            return (
              <div 
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className={`group relative perspective-1000 cursor-pointer h-40 md:h-64 rounded-2xl transition-all duration-500 
                  ${isUnlocked ? 'hover:scale-105 active:scale-95' : 'opacity-80 grayscale-[0.2]'}
                `}
              >
                <div className={`w-full h-full rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md border-2 transition-colors
                  ${letter.type === 'birthday' ? 'bg-amber-50 border-amber-200 shadow-amber-100/30' : 
                    letter.type === 'special' ? 'bg-rose-50 border-rose-200 shadow-rose-100/30' : 'bg-white border-stone-100 shadow-stone-100/30'}
                `}>
                  {isUnlocked ? (
                    <>
                      <div className={`p-3 md:p-4 rounded-full mb-3 ${letter.type === 'birthday' ? 'bg-amber-100' : letter.type === 'special' ? 'bg-rose-100' : 'bg-stone-100'}`}>
                        {letter.type === 'birthday' ? <Star size={20} className="text-amber-500 animate-pulse" /> : 
                         letter.type === 'special' ? <Heart size={20} className="text-rose-500 animate-bounce" fill="currentColor" /> : 
                         <Mail size={20} className="text-stone-400" />}
                      </div>
                      <h3 className="text-xs md:text-base font-medium mb-1 line-clamp-2 px-2 leading-snug">{letter.title}</h3>
                      <p className="text-[9px] md:text-xs font-sans text-stone-400 mt-auto">
                        {testMode && !isReleased ? `🔒 ${letter.dateString}` : letter.dateString}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="p-3 rounded-full bg-stone-50 mb-2 text-stone-300">
                        <Lock size={18} />
                      </div>
                      <p className="text-[10px] md:text-sm font-sans text-stone-400 italic">Disponível em</p>
                      <p className="text-xs md:text-sm font-medium text-stone-500">{letter.dateString}</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selectedLetter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-[#fdfbf7] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative animate-in zoom-in-95 duration-300 border-t-8 border-rose-400 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedLetter(null)}
              className="sticky top-4 right-4 self-end p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-400 z-[110] shadow-sm m-4"
            >
              <span className="text-xl font-sans">&times;</span>
            </button>

            <div className="p-6 md:p-16 pt-0">
              <div className="flex items-center gap-2 text-rose-400 mb-6 font-sans text-[10px] md:text-xs tracking-widest uppercase font-semibold">
                <Clock size={14} />
                <span>{selectedLetter.dateString}</span>
                {selectedLetter.label && (
                  <><span className="text-stone-300">|</span><span className="text-rose-500">{selectedLetter.label}</span></>
                )}
              </div>

              <h2 className="text-2xl md:text-4xl font-light mb-8 text-[#4a3a32] border-b border-rose-100 pb-4 italic leading-tight">
                {selectedLetter.title}
              </h2>

              <div className="prose prose-stone max-w-none">
                <p className="text-lg md:text-xl leading-relaxed text-[#5a4a42] italic whitespace-pre-wrap">
                  "{selectedLetter.content}"
                </p>
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="w-12 h-px bg-stone-200"></div>
                <div className="text-center italic text-stone-400 text-sm md:text-base">
                  Com todo o meu amor,<br />
                  <span className="text-rose-400 font-bold not-italic mt-2 block">Seu para sempre.</span>
                </div>
                <Heart fill="#fb7185" className="text-rose-400 w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedLetter(null)}></div>
        </div>
      )}

      <footer className="py-10 border-t border-stone-100 text-center font-sans text-stone-400 text-[10px] px-4">
        <p>Projeto Eternidade 2026 - Versão Final Revisada</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
        body { font-family: 'Playfair Display', serif; -webkit-tap-highlight-color: transparent; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .perspective-1000 { perspective: 1000px; }
        @keyframes heartFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-heart-fall { animation-name: heartFall; animation-timing-function: linear; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default App;