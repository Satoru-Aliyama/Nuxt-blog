<template>
  <button class="button" :class="btnStyle" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    btnStyle: {
      type: String,
      default: ""
    }
  }
};
</script>


<style scoped>
.button {
  font: inherit;
  background-color: rgb(18, 10, 88);
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid rgb(18, 10, 88);
  margin-top: 20px;
  width: 120px;
}

.button:hover,
.button:active {
  background-color: rgb(79, 66, 199);
  border: 1px solid rgb(18, 10, 88);
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}

.cancel {
  background-color: rgb(6, 161, 148);
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: rgb(84, 214, 203);
  border: 1px solid transparent;
  color: white;
}
</style>
