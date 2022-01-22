function PersonServices() {
    this.getPerson = function () {
        return axios({
            method: 'GET',
            url: 'https://61d03ed8cd2ee50017cc980b.mockapi.io/Person',
        });
    }
    this.addPerson = function (person) {
        return axios({
            method: 'POST',
            url: 'https://61d03ed8cd2ee50017cc980b.mockapi.io/Person',
            data: person
        });
    }
    this.deletePerson = function (id) {
        return axios({
            method: 'DELETE',
            url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/Person/${id}`,
        });
    }
    this.showPerson = function (id) {
        return axios({
            method: 'GET',
            url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/Person/${id}`,
        });
    }
    this.updatePerson = function (id, person) {
        return axios({
            method: 'PUT',
            url: `https://61d03ed8cd2ee50017cc980b.mockapi.io/Person/${id}`,
            data: person
        });
    }

}