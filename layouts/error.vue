<template>
  <div class="error-page">
    <h1>Oops, something went wrong!</h1>
    <h2>
      Back to
      <a href="/">safety</a>!
    </h2>
  </div>
</template>

<style scoped>
.error-page {
  margin-top: 150px;
  text-align: center;
}

h2 {
  margin-top: 30px;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
