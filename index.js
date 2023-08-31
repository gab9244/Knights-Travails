//A tarefa é criar uma função KnightsMoves que mostra o menor caminho possível para sair de um quadrado e chegar a outro, mostrando todos os quadrados que o caveleiro deve que passar sobre.
//O cavaleiro se move em l, dois quadrados para frante e um para direita ou esquerda
//Pense no tabuleiro como tendo coordenadas bidimensionais. A função deve ser parecer como isso:
//  KnightsMoves([0,0],[1,2] == [[0,0],[1,2]])
//  KnightsMoves([0,0],[3,3] == [[0,0],[1,2],[3,3]])
//  KnightsMoves([3,3],[0,0] == [[3,3],[1,2],[0,0]])

//1.Escreva um algoritmo que cria um tabuleiro e um cavaleiro
//2.Trade todos os movimentos possíveis do cavaleiro como filhos em uma árvore.Não permita que nenhum movimento saia do tabuleiro
//3.Decida qual algoritmo de busca usar.Um dos algoritmos pode ser uma serie infinida
//4.Use o algoritmo escolhido para encontrar o menor caminho entre o ponto de partida(ou node) e o último quadrado.Mostre todo o percurso
 const queue = [];
 const visited = [];
 
  class chessboard{
    constructor(){
        this.adjacencyList = []
    }
    makeBoard(){
        //Criamos o tabuleiro usando for loop aninhado
        for(let i = 0; i<8; i++){
            this.adjacencyList[i] = []

            for(let j = 0; j<8; j++){
                this.adjacencyList[i][j] = `[${i}, ${j}]`
            }
        }
        return this.adjacencyList
    }
    //O método GetlegalMoves retorna todos os movimentos que 
    GetlegalMoves([x, y], board = this.makeBoard()){

        for (let i = 0; i < board.length; ++i) {
            //Com o loop for passamos de vertex em vertex aplicando o método filter(), que nesse caso verifica se o quadrado(vertex) é uma posição possivel para o cavaleiro e por fim retorna uma nova array que possui apenas elementos que passaram no teste do filter()
            board[i] = board[i].filter(
              (move) =>
                move === `[${x - 2}, ${y - 1}]` ||
                move === `[${x - 1}, ${y - 2}]` ||
                move === `[${x + 1}, ${y - 2}]` ||
                move === `[${x + 2}, ${y - 1}]` ||
                move === `[${x + 2}, ${y + 1}]` ||
                move === `[${x + 1}, ${y + 2}]` ||
                move === `[${x - 1}, ${y + 2}]` ||
                move === `[${x - 2}, ${y + 1}]`
            );
          }
          //Com o método board sendo agora uma array de movimentos possiveis do cavaleiro, usamos o método flat() para fazer com que subarrays sejam concatenadas com a array principal e por fim retornamos o board
          board = board.flat();
          return board;
    }
    Node([x,y]){
        let node = {value:`[${x}, ${y}]`, prev:null}
        return node
    }
    BFS(node,end){
        //Colocamos na array visited o primeiro elemento do queue
        visited.push(queue.shift());
        //Criamos a variavel children que possui como valor os movimentos possiveis do cavaleiro
        let children = this.GetlegalMoves(JSON.parse(node.value));
        //Para cada movimento aplique a função a seguir que adiciona os valores ao queue se eles não forem duplicados
        children.forEach(child=>{
            child = {value:child, prev: node};
            if(!visited.some((el) => el.value === child.value)){
                queue.push(child)
            }
        });
        //Se o valor do parâmetro node for igual ao valor do método Node() retorne node, caso contrário recursivamente chame o método e coloque mais um elemento a array visited
        if(node.value === this.Node(end).value){
            return node;
        } else {
            return this.BFS(queue[0], end);
        }
    }
    KnightMoves(start,end){
        //Se o destino final do cavaleiro informado for menor que zero ou maior que sete(sair do tabuleiro) retorne uma mensagem
        if(end[0] > 7||end[0] < 0|| end[1] > 7|| end[1] < 0){
            return "Out of range, please enter start and end points between [0, 0] and [7, 7]";
        }
        //Coloque no queue um node com o valor sendo a posição inicial do cavaleiro
        queue.push(this.Node(start));
        //path possui como valor o primeiro elemento do queue do BSF e o parâmetro end
        let path = this.BFS(queue[0], end);
        //crie uma array vazia
        const output =[];
        //Coloque o valor de path na array output
        output.push(path.value);
        //Enquanto não acabar os quadrados entre o start e end faça o seguinte: Adiciona ao primeiro index de output o valor do quadrado anterior e também faça com que esse processo continue fazendo com que path seja igual a path.prev
        while(path.prev !== null){
            output.unshift(path.prev.value);
            path = path.prev;
        }
        //Por fim retorne uma mensagem ao console e para cada elemento dentro de output mostre ao console esse elemento(quadrado)
        console.log("Here is your path from " + start + " to " + end)
        output.forEach((move) => console.log(move))
    }

  }
  //Chame o método KnightMoves() e defina o parâmetro start([0,0]) e end([3,3])
  let newBoard = new chessboard()
console.log(newBoard.KnightMoves([0,0], [3,3]))
