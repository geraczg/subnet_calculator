# subnet_calculator

Aplicación web estática para calcular subredes IPv4 con FLSM y VLSM, visualizar resultados clave y revisar el procedimiento de subnetting paso a paso.

## Objetivo

El proyecto está orientado al aprendizaje y práctica de fundamentos de redes IPv4. Permite ingresar una red base, elegir un prefijo CIDR y generar subredes con datos como red, primer host, último host, broadcast, máscara, wildcard, hosts útiles y representación binaria.

## Características

- Cálculo de subredes IPv4 con FLSM.
- Cálculo básico de VLSM a partir de hosts requeridos.
- Resumen separado entre red original y resultado del subneteo.
- Opción para ver el cálculo paso a paso.
- Tabla de subredes con opción de copiar al portapapeles.
- Guía rápida con pasos de uso y conceptos básicos.
- Cambio de idioma entre español e inglés.
- Interfaz responsive con diseño visual para landing page.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- GitHub Pages compatible

## Estructura

```text
.
├── README.md
├── index.html
├── styles.css
├── app.js
├── dev_server.py
└── assets/
```

## Uso local

Abre el archivo principal en el navegador:

```text
index.html
```

También se puede ejecutar con un servidor local:

```bash
python dev_server.py
```

Luego abre:

```text
http://127.0.0.1:8081
```

## Ejemplo de cálculo

Entrada:

```text
IP: 192.168.10.0
Prefijo: /24
Subredes requeridas: 4
Modo: FLSM
```

Resultado esperado:

```text
Nuevo prefijo: /26
Nueva máscara: 255.255.255.192
Hosts por subred: 62
Incremento: 64
```

## Alcance

La aplicación está enfocada en subnetting IPv4 para fines educativos. No implementa IPv6 ni pretende reemplazar herramientas profesionales de diseño, administración o auditoría de redes.
