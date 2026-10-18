import './App.css'


const animals = [
    {
        id: 1,
        name: 'Бім',
        type: 'Собака',
        age: '3 роки',
        description: 'Дружній та активний, любить прогулянки.',
    },
    {
        id: 2,
        name: 'Мурка',
        type: 'Кішка',
        age: '2 роки',
        description: 'Спокійна, лагідна та дуже любить увагу.',
    },
    {
        id: 3,
        name: 'Рекс',
        type: 'Собака',
        age: '5 років',
        description: 'Вірний охоронець, добре ладнає з людьми.',
    },
]

function App() {
    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <section className="mx-auto max-w-5xl">
                <h1 className="text-center text-4xl font-bold text-gray-900 tracking-tight mb-4">
                    Тварини у притулку
                </h1>

                <p className="text-center text-gray-600 mb-10">
                    Познайомтеся з нашими підопічними, які шукають люблячу родину.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {animals.map((animal) => (
                        <article
                            key={animal.id}
                            className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                        >
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 mb-4">
                {animal.type}
              </span>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                {animal.name}
                            </h2>

                            <p className="text-sm font-medium text-gray-500 mb-3">
                                Вік: {animal.age}
                            </p>

                            <p className="text-gray-700">
                                {animal.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default App
