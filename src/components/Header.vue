<template>
  <v-app-bar class="header" flat>
    <v-container class="header__content" fluid>
      <router-link class="header__brand" to="/" aria-label="Lamarr, voltar para o início">
        Lamarr
      </router-link>

      <v-spacer />

      <nav class="desktop-navigation" aria-label="Navegação principal">
        <a class="header__link" href="/#porque-usar">Por que usar?</a>
        <a class="header__link" href="/#como-usar">Como funciona</a>
        <a class="header__link" href="/#sobre">Sobre</a>
        <v-btn class="header__start" variant="text" to="/trilhas/nova">Começar</v-btn>
      </nav>

      <div class="mobile-navigation">
        <v-menu location="bottom end" :offset="8" content-class="header-menu">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              aria-label="Abrir menu"
              class="mobile-navigation__toggle"
              icon="mdi-menu"
              variant="text"
            />
          </template>

          <v-list bg-color="primary" class="header-menu__list">
            <v-list-item href="/#porque-usar" title="Por que usar?" />
            <v-list-item href="/#como-usar" title="Como funciona" />
            <v-list-item href="/#sobre" title="Sobre" />
            <v-list-item class="header-menu__start" to="/trilhas/nova" title="COMEÇAR" />
          </v-list>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.header {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-surface));
}

.header__content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: none;
  padding: 0 clamp(1rem, 4vw, 2.5rem);
}

.header__brand,
.header__link,
.header__start {
  color: rgb(var(--v-theme-surface)) !important;
  font-weight: 700;
  text-decoration: none;
}

.header__brand {
  font-size: 1.65rem;
  letter-spacing: -0.05em;
  line-height: 1;
}

.desktop-navigation {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 3.5rem);
}

.header__link {
  font-size: 0.82rem;
  letter-spacing: 0.01em;
}

.header__link:hover,
.header__link:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.3rem;
}

.header__start {
  margin-left: clamp(0.5rem, 2vw, 2rem);
  padding-inline: 0;
  text-transform: none;
}

.mobile-navigation {
  display: none;
}

.mobile-navigation__toggle {
  color: rgb(var(--v-theme-surface));
}

:deep(.header-menu) {
  border-radius: 0;
}

:deep(.header-menu__list) {
  min-width: 220px;
  padding: 0.5rem 0;
}

:deep(.header-menu__list .v-list-item) {
  color: rgb(var(--v-theme-surface));
  min-height: 44px;
}

:deep(.header-menu__list .v-list-item-title) {
  font-size: 0.85rem;
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
    font-size: 1.55rem;
  }
}
</style>
