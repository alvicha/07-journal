import journalApi from "@/api/journal/journalApi"

export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get("/entries.json")
    if (!data) {
        commit('setEntries', []);
        return
    }
    const entriesDB = []
    for (let id of Object.keys(data)) {
        entriesDB.push({
            id,
            ...data[id]
        })
    }
    commit('setEntries', entriesDB) //Hacemos commit de la mutacion que hay que ejecutar
}

export const updateEntries = async ({ commit }, entry) => {

    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const response = await journalApi.put(`/entries/${entry.id}.json`, dataToSave);
    console.log(response);
    commit('updateEntry', { ...entry });
}

export const createEntries = async ({ commit }, entry) => {
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const { data } = await journalApi.post("/entries.json", dataToSave)
    dataToSave.id = data.name;
    commit('addEntry', dataToSave)
    return data.name;
}

export const deleteEntries = async ({ commit }, id) => {
    const { data } = await journalApi.delete(`/entries/${id}.json`)
    commit('deleteEntry', id)
    return data;
}
