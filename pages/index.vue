<template>
  <div class="home-page">
    <section class="intro">
      <TheHeader @sidenavToggle="deisplaySidenav = !deisplaySidenav" />
      <TheSidenav :show="deisplaySidenav" @close="deisplaySidenav = false" />
      <div class="title">
        <h1>
          <span style="color: rgb(18, 10, 88);">NUXT</span>
          <span style="color: rgb(6, 161, 148);">WORLD</span>
        </h1>
      </div>
      <div class="btn">
        <button><nuxt-link to="/posts">Look</nuxt-link></button>
        <button><nuxt-link to="/admin/auth">Join</nuxt-link></button>
      </div>
    </section>
    <div class="me">
      <a href="https://satoruakiyama.com">&copy; Satoru Akiyama</a>
    </div>
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
  layout: "home",
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      deisplaySidenav: false
    };
  }
};
</script>

<style scoped>
.home-page {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page.jpg");
  background-position: center;
  background-size: cover;
  text-align: center;
}

.title {
  max-width: 100%;
  margin: 0 auto;
  margin-top: 40%;
  text-align: center;
  font-size: 40px;
  background-color: rgba(255, 255, 255, 0.692);
  padding: 10px 20px;
  display: inline-block;
}

a {
  text-decoration: none;
  color: rgb(28, 0, 80);
}

a:hover {
  color: rgb(89, 255, 241);
}

button {
  margin: 50px 20px;
  width: 80px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.753);
  height: 40px;
}
.me {
  position: absolute;
  bottom: 40px;
  right: 30px;
}

.me a {
  color: #fff;
}

@media (min-width: 768px) {
  .title {
    font-size: 40px;
    margin-top: 20%;
  }
}
</style>
