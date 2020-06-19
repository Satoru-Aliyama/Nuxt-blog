<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on {{ loadedPost.updateDate | dateFilter }}
        </div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>
      </div>
      <div class="post-pic">
        <div
          class="post-thumbnail"
          :style="{ backgroundImage: 'url' + '(' + loadedPost.thumbnail + ')' }"
        ></div>
      </div>
      <div class="post-content">
        <p>{{ loadedPost.content }}</p>
      </div>
    </section>
    <br />
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send me a mail to
        <a :href="'mailto:' + loadedPost.email">here</a>.
      </p>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData(context) {
    if (context.payload) {
      return {
        loadedPost: context.payload.postData
      };
    }
    return axios
      .get(process.env.baseUrl + context.params.id + ".json")
      .then(res => {
        return {
          loadedPost: res.data
        };
      })
      .catch(e => context.error(e));
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
  border: 3px solid #ccc;
  margin: 40px auto;
  max-width: 92%;
  background: #fff;
}

.post {
  width: 100%;
  position: relative;
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-content {
  max-width: 100%;
  text-align: left;
}
.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
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

.post-pic {
  box-shadow: 0 2px 2px #ccc;
  width: 90%;
  height: 180px;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
}

@media (min-width: 600px) {
  .post-pic {
    width: 400px;
    height: 250px;
  }
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }

  .post-details {
    flex-direction: row;
  }

  .single-post-page {
    max-width: 700px;
  }
}
</style>
