import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Crear la figura
fig, ax = plt.subplots(figsize=(10, 6))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Cajas
cajas = [
    {"xy": (1, 8), "text": "Usuario"},
    {"xy": (3.5, 6), "text": "Frontend\nReact + HTML + CSS"},
    {"xy": (3.5, 3.5), "text": "Lógica de negocio\nJavaScript + useState/useEffect"},
    {"xy": (3.5, 1), "text": "Persistencia\nlocalStorage"},
]

# Dibujar las cajas
for caja in cajas:
    rect = patches.FancyBboxPatch(caja["xy"], 3, 1.5, boxstyle="round,pad=0.1", edgecolor="black", facecolor="#D0E4F5")
    ax.add_patch(rect)
    ax.text(caja["xy"][0]+1.5, caja["xy"][1]+0.75, caja["text"], ha='center', va='center', fontsize=9)

# Flechas
flechas = [
    ((2.5, 8), (5, 7.5)),
    ((5, 6), (5, 5)),
    ((5, 3.5), (5, 2.5)),
    ((5, 1), (5, 0.5))
]
for inicio, fin in flechas:
    ax.annotate("", xy=fin, xytext=inicio, arrowprops=dict(arrowstyle="->", lw=1.5))

# Mostrar
plt.title("Arquitectura Cliente-Servidor - Analizador de Gastos", fontsize=12)
plt.show()
