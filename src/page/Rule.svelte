<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let isEnglish = false; 

  function close() {
    dispatch('close');
  }

  function toggleLang() {
    isEnglish = !isEnglish;
  }
</script>

<div class="rules-popup">
  {#if !isEnglish}
  <h2>遊戲規則</h2>
  <p>
遊戲將在9*9的棋盤進行，分別有2人和2人以上兩種規則。

獲勝條件
當每一顆棋子佔有僅存在自己的地盤時，遊戲即結束，佔據最多格數的玩家獲勝，若有同格數的玩家以最大地盤格數較多者獲勝。

2人
1.每人持有4顆棋子，以12211221的順序輪流擺放棋子。
2.擺放完棋子後，照1212的順序輪流移動棋子，移動1-2步，移動的路徑上不可有牆或其他玩家，且可以回到原位，並在移動結束的位置上、下、左、右其一沒有建牆方位造一面牆，該操作需在90秒內完成，否則將自動隨機建一面牆並進入下一回合。

2人以上
1.每人持有2顆棋子，以12344321的順序輪流擺放棋子。
2.擺放完棋子後，照12341234的順序輪流移動棋子，移動1-2步，移動的路徑上不可有牆或其他玩家，且可以回到原位，並在移動結束的位置上、下、左、右其一沒有建牆方位造一面牆，該操作需在90秒內完成，否則將自動隨機建一面牆並進入下一回合。
3.每局遊戲玩家將有1次機會可將牆面打破。
  </p>
  {:else}
  <h2>Game Rules</h2>
  <p>
The game is played on a 9x9 board and has two rule sets: one for 2 players and one for more than 2 players.

Winning Condition
The game ends when every piece exclusively occupies its own territory. The player who controls the most grid spaces wins. If players control the same number of spaces, the player with more largest connected territories wins.

2 Players
Each player has 4 pieces. Pieces are placed in the order: 1-2-2-1-1-2-2-1.
After placing all pieces, players take turns in the order 1-2-1-2 to move their pieces. A piece may move 1 to 2 steps per turn. The path must not cross any walls or other players and may return to its original position.
After moving, the player must build a wall in one direction (up, down, left, or right) adjacent to the final position where no wall currently exists. This must be done within 90 seconds, or a wall will be placed randomly, and the next turn begins automatically.

More Than 2 Players
Each player has 2 pieces. Pieces are placed in the order: 1-2-3-4-4-3-2-1.
After placing all pieces, players take turns in the order: 1-2-3-4-1-2-3-4 to move their pieces. A piece may move 1 to 2 steps per turn. The path must not cross any walls or other players and may return to its original position.
After moving, the player must build a wall in one direction (up, down, left, or right) adjacent to the final position where no wall currently exists. This must be done within 90 seconds, or a wall will be placed randomly, and the next turn begins automatically.
Each player may break one wall once per game.
  </p>
  {/if}

  <div class="buttons">
    <button class="close-btn" on:click={close}>{isEnglish ? 'Close' : '關閉'}</button>
    <button class="toggle-lang-btn" on:click={toggleLang}>
      {isEnglish ? '中文' : 'English'}
    </button>
  </div>
</div>

<style>
.rules-popup {
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  width: 60%;
  background: #fff;
  border: 1px solid #aaa;
  padding: 1rem;
  z-index: 100;
  overflow-y: auto;
  border-radius: 6px;
  white-space: pre-wrap;
  text-align: left;
}


.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

</style>
