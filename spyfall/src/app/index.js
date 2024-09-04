export default function Wiener() {
  return (
    <main className={styles.main}>
      <div class="row"> <p class="title"><a href="index.html"> SpyGoon </a></p> </div>    

      <div class="row"> <button onclick="location.href = 'host.html';"> Host Game </button> </div>

      <div class="row"> <h3> OR </h3> </div>

      <div class="row"> <h3 style="padding-right: 10px; display:inline"> I have a lobby code: </h3> <input type="text" placeholder="I'm makin em at night">  </input> </div>


    </main>
  );
}
