<template>
  <nuxt-link :to="postLink" class="post-preview">
    <article>
      <div
        class="post-thumbnail"
        :style="{ backgroundImage: 'url(' + thumbnail + ')' }"
      ></div>
      <div class="post-content">
        <h1>{{ title }}</h1>
        <p>{{ previewText }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  name: "PostPreview",
  props: {
    id: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    previewText: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  computed: {
    postLink() {
      return this.isAdmin ? "/admin/" + this.id : "/posts/" + this.id;
    }
  }
};
</script>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px rgba(46, 46, 46, 0.74);
  background-color: white;
  width: 90%;
  height: 180px;
  margin: 20px;
  position: relative;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 600px) {
  .post-preview {
    width: 400px;
    height: 250px;
    margin: 20px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-position: center;
  background-size: cover;
  transition: all 0.5s;
}

.post-thumbnail:hover {
  transform: scale(1.2);
}

.post-content {
  padding: 10px;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.808);
  z-index: 1;
}

a:hover .post-content,
a:active .post-content {
  background-color: rgb(72, 255, 215);
}
</style>
