<template>
  <div>
    <TheHeader @sidenavToggle="deisplaySidenav = !deisplaySidenav" />
    <TheSidenav :show="deisplaySidenav" @close="deisplaySidenav = false" />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
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
<style>
html {
  font-family: "Open Sans", sans-serif;
}
</style>
