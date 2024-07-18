//variável para armazenar os dados do corredor.
const player1 = {
  name: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0
};

//variável para armazenar os dados do corredor.
const player2 = {
  name: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  pontos: 0
};

//função para gerar blocos
async function getRandonBlock() {
  let random = Math.random();
  let result 

  switch(true){
    case random < 0.33:
      result = "RETA"
      break;
    
    case random < 0.66:
      result = "CURVA"
      break;  
    

      default:
        result = "CONFRONTO"
        break;  
  }

  return result;

}


//funcao para retornar os resultados dos confrontos 
async function logRollResult(characterName, block, diceResult, atributte ){
  console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atributte} = ${diceResult + atributte}`)
}



//função para criar as rodadas
async function playRaceEngine(character1, character2){
  for (let round = 1; round < 5; round++) {
    console.log(`🏁 Rodada  ${round}`);

    //sortear um bloco
    let block = await getRandonBlock();
    console.log(`Bloco ${block}`)


    //rolar os dados
    let diceResult1 = await rollDace();
    let diceResult2 = await rollDace();


    //teste de habilidade
    let totalTestSkill1 = 0
    let totalTestSkill2 = 0


    //gerando os pontos conforme o retorno do randon
    if(block === "RETA"){
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.name, 
        "velocidade", 
        diceResult1, 
        character1.velocidade
      )
      await logRollResult(
        character2.name, 
        "velocidade", 
        diceResult2, 
        character2.velocidade
      )
      
    }
    if(block === "CURVA"){
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.name, 
        "manobrabilidade", 
        diceResult1, 
        character1.manobrabilidade
      )
      await logRollResult(
        character2.name, 
        "manobrabilidade", 
        diceResult2, 
        character2.manobrabilidade
      )
    }

    if(block === "CONFRONTO"){
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.name} confrontou com ${character2.name}! 🥊`)

      await logRollResult(
        character1.name, 
        "poder", 
        diceResult1, 
        character1.poder
      )
      await logRollResult(
        character2.name, 
        "poder", 
        diceResult2, 
        character2.poder
      )

      //Variável responsável por criar o random dos numeros dos poderes
      let randomNumber = Math.floor(Math.random(0 , 1) * 2);
      
      //Condicional responsável por validar e retornar as mensagens
      if(powerResult1 > powerResult2 && character2.poder > 0){
        if(randomNumber === 0 && character2.pontos >= 0){
          console.log(`O ${character1.name} jogou uma 💣 e venceu um confronto! ${character2.name} perdeu 1 ponto!`)

          if(character2.pontos <= 0){
            character2.pontos = 0
            console.log("Mas como não temos pontos para retirar, nenhum player perdeu ponto(s)!")
          }else if(character2.pontos >= 1){
            character2.pontos --;
          }
    
        }
        else if(randomNumber === 1 && character2.pontos >= 0){
          console.log(`O ${character1.name} jogou um casco e venceu um confronto! ${character2.name} perdeu 1 ponto! 🐢`);      

          character2.pontos --;

        }else if(randomNumber === 0 && randomNumber === 1 && character2.pontos === 0){
          console.log("Mas como não temos pontos para retirar, nenhum player perdeu ponto(s)!")
        }
      }
      
      if(powerResult2 > powerResult1 && character1.poder > 0){
        if(randomNumber === 0 && character1.pontos > 0){
          console.log(`O ${character2.name} jogou uma 💣 e venceu um confronto! ${character1.name} perdeu 1 ponto!`);
          
          if(character1.pontos <= 0){
            character1.pontos = 0
            console.log("Mas como não temos pontos para retirar, nenhum player perdeu ponto(s)!")
          }else if(character1.pontos >= 1){
            character2.pontos --;
          }

        }
        else if(randomNumber === 1 && character1.pontos > 0){     
          console.log(`O ${character2.name} jogou um casco e venceu um confronto! ${character1.name} perdeu 1 ponto! 🐢`);
          character1.pontos --;

        }else if(randomNumber === 0 && randomNumber === 1 && character1.pontos === 0){
          console.log("Mas como não temos pontos para retirar, nenhum player perdeu ponto(s)!")
        }
      }

      console.log( 
        powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido!" 
        : ""
      )

    }

    


    //verificando o vencedor
    if(totalTestSkill1 > totalTestSkill2){
      console.log(`${character1.name} marcou um ponto!`)
      character1.pontos++;
    }else if(totalTestSkill2 > totalTestSkill1){
      console.log(`${character2.name} marcou um ponto!`)
      character2.pontos++;
    }
    console.log("_______________________________")

    
  }
};


//função para contagem dos rounds
async function rollDace(){
  return Math.floor(Math.random() * 6) + 1; 
};


//funcao para mostar o vencedor

async function declareWinner(character1, character2){
  console.log("Resultado final: ")
  console.log(`${character1.name}: ${character1.pontos} ponto(s)`)
  console.log(`${character2.name}: ${character2.pontos} ponto(s)`)


  //if encadiado ganha
  if(character1.pontos > character2.pontos)
    console.log(`\n ${character1.name} venceu a corrida! Parabéns!! 🏆`)
  else if(character2.pontos > character1.pontos)
    console.log(`\n ${character2.name} venceu a corrida! Parabéns!! 🏆`)
  else
    console.log("A corrida terminou em empate!")
  
}

//função principal que executa o jogo
(async function main(){

  console.log(` 🏁🚨 Corrida entre ${player1.name} e ${player2.name} começando...`);

  //invocando a função para trazer os players
  await playRaceEngine(player1, player2);

  //chamando a função
  await declareWinner(player1, player2)

})();


