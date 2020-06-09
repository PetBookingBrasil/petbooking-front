import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";

import {
  Component,
  Nav,
  AvatarWrapper,
  Name,
  NavBody,
  NavLink,
  NavIcon,
} from "./styles";

export default function Container({ children }) {
  const user = useSelector(({ user }) => user);
  const navItems = [
    {
      name: "Agenda",
      href: "/gerente/agenda",
      icon: "/menu-icon-agenda.svg",
      subItems: [],
    },
    {
      name: "Recorrência",
      href: "/gerente/recorrencia",
      icon: "/menu-icon-recurrence.png",
      subItems: [],
    },
    {
      name: "Dashboard do lojista",
      icon: "/dashboard.svg",
      subItems: [
        {
          name: "Dashboard do lojista",
          href: "/v2/gerente/dashboard/lojista",
        },
        {
          name: "Mapa de calor de agendamentos",
          href: "/v2/gerente/dashboard/mapa_de_calor_agendamentos",
        },
        {
          name: "Mapa de calor de faturamento",
          href: "/v2/gerente/dashboard/mapa_de_calor_faturamento",
        },
      ],
    },
    {
      name: "Pacotes",
      icon: "/package.svg",
      subItems: [
        {
          name: "Meus pacotes",
          href: "/v2/gerente/pacotes",
        },
        {
          name: "Novo Pacote",
          href: "/v2/gerente/pacotes/new",
        },
        {
          name: "Consumo de pacotes",
          href: "/v2/gerente/consumo_de_pacotes/active_packages",
        },
      ],
    },
    {
      name: "Comanda",
      href: "/gerente/comandas",
      icon: "/menu-icon-check.svg",
      subItems: [],
    },
    {
      name: "Clientes & Pets",
      href: "/gerente/clientes",
      icon: "/menu-icon-users.svg",
      subItems: [],
    },
    {
      name: "Profissionais",
      href: "/gerente/profissionais",
      icon: "/menu-icon-employees.svg",
      subItems: [],
    },
    {
      name: "Serviços e Habilidades",
      href: "/gerente/servicos",
      icon: "/menu-icon-services.svg",
      subItems: [],
    },
    {
      name: "Fornecedores",
      href: "/gerente/fornecedores",
      icon: "/menu-icon-suppliers.svg",
      subItems: [],
    },
    {
      name: "Marketing",
      icon: "/menu-icon-messaging.svg",
      subItems: [
        {
          name: "Contratar Planos",
          href: "v2/gerente/assinaturas",
        },
        {
          name: "Enviar SMS (0 restantes)",
          href: "v2/gerente/marketing/smses/new",
        },
        {
          name: "Enviar Emails (0 restantes)",
          href: "v2/gerente/marketing/emails/new",
        },
        {
          name: "Campanhas Enviadas",
          href: "v2/gerente/marketing/",
        },
      ],
    },
    {
      name: "Relatórios",
      icon: "/menu-icon-reports.svg",
      subItems: [
        {
          name: "Relatórios de venda",
          href: "v2/gerente/relatorios",
        },
        {
          name: "Relatórios de Agendamentos",
          href: "v2/gerente/relatorios/novo",
        },
        {
          name: "Emissão de RPS",
          href: "/gerente/rps/waiting",
        },
        {
          name: "Relatórios de Vouchers",
          href: "v2/gerente/uso_de_vouchers",
        },
      ],
    },
    {
      name: "Pagamento",
      icon: "/menu-icon-payment.svg",
      subItems: [
        {
          name: "Meus cartões de crédito",
          href: "v2/gerente/cartoes",
        },
        {
          name: "Notas fiscais",
          href: "v2/gerente/invoices",
        },
      ],
    },
    {
      name: "Configurações",
      icon: "/menu-icon-settings.svg",
      subItems: [
        {
          name: "Horários de abertura",
          href: "v2/gerente/horarios_do_estabelecimento",
        },
        {
          name: "Dados gerais e imagens",
          href: "v2/gerente/empresa/geral",
        },
        {
          name: "Controle de acesso",
          href: "v2/gerente/controle_de_acesso",
        },
        {
          name: "Importar dados",
          href: "v2/gerente/importers/new",
        },
        {
          name: "Conta de pagamento",
          href: "v2/gerente/conta",
        },
      ],
    },
    {
      name: "Ajuda",
      icon: "/menu-icon-help.svg",
      href: "https://petbooking.zendesk.com",
      subItems: [],
    },
    {
      name: "Sair",
      icon: "/menu-icon-exit.svg",
      href: "/usuario/logout",
      subItems: [],
    },
  ];

  return (
    <Component>
      <Nav>
        <AvatarWrapper>
          <Name>
            <Typography variant="body2" className="margin-l-0">
              {user.name}
            </Typography>
          </Name>
        </AvatarWrapper>
        <NavBody>
          {navItems.map((item, i) => (
            <NavLink href={item.href} key={i}>
              <Typography variant="caption">{item.name}</Typography>
              <NavIcon>
                <img src={item.icon} alt="" />
              </NavIcon>
            </NavLink>
          ))}
        </NavBody>
      </Nav>

      {children}
    </Component>
  );
}
