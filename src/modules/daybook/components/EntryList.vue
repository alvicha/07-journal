<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
      <!-- Lo que hara el v-model es como ponerte como un valor por defecto pero el que nosotros pongamos ya sea este componente como con un boton-->
    </div>
    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-3" @click="createNewEntry">
        Crear nueva entrada
        <i class="fa fa-plus-circle"></i>
      </button>
    </div>
    <div class="entry-scrollarea">
      <entry-vue
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters } from "vuex";

export default {
  components: {
    EntryVue: defineAsyncComponent(() => import("./EntryVue.vue")),
  },
  computed: {
    ...mapGetters("journalModule", ["getEntriesByTerm"]), //Modulo interesado para extraer los state y su informacion
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
  data() {
    return {
      term: "",
    };
  },
  methods: {
    createNewEntry() {
      this.$router.push({
        name: "entry-view",
        params: { id: "new" }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  height: 55px;
}

.entry-list-container {
  border-right: 1px solid #2c2c2c;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>