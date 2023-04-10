import React, { useEffect, useMemo, useState } from "react";
import styled from 'styled-components'


const Caixa = styled.div`
  background-color:${props => props.back};
`

//ordem de estrutra da explicação 
// 1º criar o component com 3 input type number.

// 2º criar 3 states para setar o valor de cada input para ser atualizado conforme o state é alterado a conexão deverá ser feita com onChange
// e value para mostrar o valor de cada state no input.

// 3º criar uma função fora do scopo da function App que vai retornar a soma de a + b,
// em seguida criar uma variavel que altere o parametroda função de soma dos primeiros states criados para const result = soma(n1, n2);, executar essa função e mostrar para alunos que está funcionando normal
// e o terceiro state será importante apenas para os proximos passos.

//4º agora vamos criar uma logica dentro da função de soma para que a patir da data atual ele espere 2 segundos para excutar cada atualização de renderização sobre os input e resultado da soma.
// Isso irá gerar um problema de rederização geral no componente pois essa logica ira criar um loop
// e funcionar para todas as atualizações feitas na nossa pagina.

//5º demostrar uma solução com ferramentas conhecidas como useState e useEffect usando da array de dependencia do useEffect
// para setar apenas a rederização lenta para atualização dos states especificos n1 e n2.

//6º mostrar a solução com useMemo armazendo um valor pre calculado em e guardado em cache que só é executado quando as dependencias do useMemo forem modificadas,
// funciona de uma forma bem semelhante ao useEffect,
// a diferença é que o calculo ou a execução da função ja vai estar armazenada em cache evitando assim re-renderização do component
// e chamando apenas o valor ou a execução quando as dependencias forem atualizadas ou modificadas. 

//7º exemplo adicional simples mudando a cor de fundo da div com useMemo

// OBS:Vale lembrar aqui que o useMemo não tem a mesma função do localStorage,
// o useMemo é usado principalemnte para otimização de desempenho pois ao guardar uma execução em cache evita execuções repetidas
// sempre que um componente é renderizado novamente.
// Já o localStorage é um recurso que permite armazenar dados localmente no dispositivo do usuario 
//(isso aqui é caso essa pergunta surga pelos alunos.)

function soma(a, b) {
  const futuro = Date.now() + 800 /* aqui estou criando uma const para que espere 2000 mili segundos 
   partir de um while que o Date.now()data atual seja maior que a data guardada na variavel futura que no caso vai ser
    a data atual + 2000 segundos, que é o mesmo que espera 2 segundos antes de executar o return */
  while (Date.now() < futuro) { }
  return a + b  /* porém isso causa um problema de renderização total do component
   por que até o 3 input que não faz parte da função entra nessa espera */
}



function App() {
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [n3, setN3] = useState(0);
  const [open, setOpen] = useState(false)
  /*  const [ result, setResult] = useState(0) //essa é uma alternativa para resolver o problema usando useState e useEffect apenas */

  /*  useEffect(() => {
     setResult(soma(n1,n2))
   }, [n1,n2]) // por conta do useEffect ele só funciona quando existe alguma alteração nos estados n1 e n2,
    fazendo funcionar a logica de demora na rederização apenas no que foi setado na função soma */


  /* const result = soma(n1, n2);  */
  //vamos simular isso em um calculo mais complexo que vai demorar um pouco mais de tempo para ser executado



  //Resolvendo com useMemo
  const result = useMemo(() => soma(n1, n2), [n1, n2])
  /*Nessa resolução eu tenho o valor pre caculado ou seja ele retorna um valor memorizado
     que ja foi executado antes em outro local
     e foi guardado em cache para ser chamado qnd as dependencias forem alteradas
     e as depedencias funcionam da mesma forma do useEffect,
     ele só retornar esse valor quando n1 e n2 forem alterados. 
   */

  /* 
    function mudar(a,b){
      if(open === false){
        return a
      }else{
        return b
      }
    } 
    
    const change = useMemo(() => mudar('#303030', '#FFA')
  , [open] ) */



  const change = useMemo(() => open === false ? '#303030' : '#ffa'
    , [open])



  return (
    <Caixa back={change}>
      <h1>UseMemo</h1>
      <input
        type="number"
        value={n1}
        onChange={(e) => setN1(Number(e.target.value))}
      />
      <input
        type="number"
        value={n2}
        onChange={(e) => setN2(Number(e.target.value))}
      />
      <input
        type="number"
        value={n3}
        onChange={(e) => setN3(Number(e.target.value))}
      />
      <h2>{result}</h2>
      <button onClick={() => setOpen(!open)}>Mudar</button>
    </Caixa>
  );
}

export default App;
