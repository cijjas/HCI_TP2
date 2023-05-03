
<template>
    <button
        :class="{ 'on': isOn, 'off': !isOn }"
        @click="toggleButton"
    >
        {{ isOn ? 'On' : 'Off' }}
    </button>
</template>

<style scoped>
.off{
    height: 200px;
    width: 200px;
    background-color: #8C783A;
    border-radius: 5%;
}
.on{
    height: 200px;
    width: 200px;
    background-color: #EECC66;
    border-radius: 5%;
}
</style>

<script>
export default {
  data() {
    return {
      isOn: false,
    }
  },
  methods: {
    toggleButton() {
      this.isOn = !this.isOn;
    },
  },
}
</script>
