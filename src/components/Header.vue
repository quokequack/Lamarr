<template>
  <v-app-bar class="header" flat>
    <v-container class="header__content" fluid>
      <a class="header__brand" href="#">Lamarr</a>

      <v-spacer />

      <nav class="desktop-navigation" aria-label="Navegação principal">
        <a class="header__link" href="#">POR QUE USAR?</a>
        <a class="header__link" href="#">COMO USAR</a>
        <a class="header__link" href="#">SOBRE</a>
        <v-btn class="header__start" variant="text" href="#">COMEÇAR</v-btn>
      </nav>

      <v-menu
        class="mobile-navigation"
        location="bottom end"
        :offset="8"
        content-class="header-menu"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            aria-label="Abrir menu"
            class="mobile-navigation__toggle"
            icon="mdi-dots-vertical"
            variant="text"
          />
        </template>

        <v-list bg-color="#000" class="header-menu__list">
          <v-list-item href="#" title="POR QUE USAR?" />
          <v-list-item href="#" title="COMO USAR" />
          <v-list-item href="#" title="SOBRE" />
          <v-list-item class="header-menu__start" href="#" title="COMEÇAR" />
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.header {
  background-color: #000 !important;
  color: #fff;
}

.header__content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: none;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
}

.header__brand {
  color: #fff;
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
}

.desktop-navigation {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 3.5rem);
}

.header__link,
.header__start {
  color: #fff !important;
  font-family: "Lexend", sans-serif;
  font-weight: 700;
  letter-spacing: 0;
  text-decoration: none;
}

.header__link {
  font-size: 0.9rem;
}

.header__start {
  margin-left: clamp(0.5rem, 2vw, 2rem);
  padding-inline: 0;
}

.mobile-navigation {
  display: none;
}

.mobile-navigation__toggle {
  color: #fff;
}

:deep(.header-menu) {
  border-radius: 4px;
}

:deep(.header-menu__list) {
  min-width: 220px;
  padding: 0.5rem 0;
}

:deep(.header-menu__list .v-list-item) {
  color: #fff;
  min-height: 44px;
}

:deep(.header-menu__list .v-list-item-title) {
  font-family: "Lexend", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
}

:deep(.header-menu__start) {
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .desktop-navigation {
    display: none;
  }

  .mobile-navigation {
    display: block;
  }

  .header__brand {
    font-size: 1.7rem;
  }
}
</style>
