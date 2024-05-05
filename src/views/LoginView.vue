<template>
  <v-container style="height: 100vh">
    <v-row class="h-100" align="center" justify="center">
      <v-col cols="9" style="height: 70vh">
        <v-card height="100%" color="secondary" class="text-center px-8 py-2">
          <v-row align="center" style="height: 45%">
            <v-col cols="12">
              <v-img
                style="margin: auto"
                :width="140"
                aspect-ratio="16/9"
                cover
                src="src/assets/images/logo.png"
              ></v-img>
              <div class="text-h5">Café Gourmet</div>
            </v-col>
          </v-row>
          <v-row style="height: 15%">
            <v-col cols="12">
              <v-text-field label="Email" variant="outlined" dense></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 13%">
            <v-col cols="12">
              <v-text-field label="Senha" variant="outlined"></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" style="height: 30%">
            <v-col cols="12">
              <v-btn width="100%" large color="primary" class="mb-2" to="/home">entrar</v-btn>
              <v-btn width="100%" large color="primary" to="/register">cadastrar</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
