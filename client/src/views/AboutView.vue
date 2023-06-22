<template>
  <section>
    <div class="welcome-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 offset-lg-2 text-center">
            <h1 class="display-4 text-black">Bienvenue sur notre site</h1>
            <p class="lead text-black">Découvrez une expérience de shopping exceptionnelle</p>
            <RouterLink class="btn btn-primary" to="/">Voir Nos Produits</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.welcome-section {
  background-image: url('https://c0.wallpaperflare.com/preview/910/104/863/shopping-keyboard-enter-button.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
