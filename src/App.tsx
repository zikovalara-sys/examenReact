import './App.css'
import {useState, useEffect} from "react";

// 1. Описуємо інтерфейс для одного завдання
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// 2. Описуємо інтерфейс для об'єкта тваринки
interface Animal {
    id: number;
    name: string;
    type: string;
    age: string;
    description: string;
    image: string;
    todos: Todo[]; // <-- Додано масив завдань
}

//Початковий список тваринок у притулку iз базовими справами
const defaultAnimals: Animal[] = [
    {
        id: 1,
        name: 'Бім',
        type: 'Собака',
        age: '3 роки',
        description: 'Дружній та активний, любить прогулянки.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlu5vPZJKtQ7w7eJ_lwFczpg5dvH2AAAfHIKVvPoK2Ol0f6AiHI0S6xhU&s=10',
        todos: [
            { id: 101, text: 'Ранкова прогулянка', completed: true },
            { id: 102, text: 'Нагодувати сухим кормом', completed: false },
        ],
    },
    {
        id: 2,
        name: 'Мурка',
        type: 'Кішка',
        age: '2 роки',
        description: 'Спокійна, лагідна та дуже любить увагу.',
        image: 'https://club4paws.ua/images/news/original/12c4806c98b56f304704dfae0266c0ac.webp',
        todos: [
            { id: 201, text: 'Почесати за вушком', completed: true },
            { id: 202, text: 'Дати вітаміни', completed: false },
        ],

    },
    {
        id: 3,
        name: 'Рекс',
        type: 'Собака',
        age: '5 років',
        description: 'Вірний охоронець, добре ладнає з людьми.',
        image: 'https://focus.ua/static/storage/thumbs/740x/b/f1/vw455w-15d880449fcfb910b5d400f958768f1b.jpg',
        todos: [
            { id: 301, text: 'Вечірнє тренування', completed: false },
        ],
    },
]

function App() {
    // Завантаження бази з LocalStorage
    const [animals, setAnimals] = useState<Animal[]>(() => {
        const savedAnimals = localStorage.getItem('shelter_animals');
        return savedAnimals ? JSON.parse(savedAnimals) : defaultAnimals;
    });

    //Стан для значень форми додавання нової тваринки
    const [name, setName] = useState<string>('');
    const[type, setType] = useState<string>('Собака'); //Тип за замовчуванням
    const [age, setAge] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<string>('');//тут буде зберігатися фотограія у форматі Base64

    // Стан для інпутів створення завдань (ключ — id тваринки, значення — текст справи)
    const [newTodoTexts, setNewTodoTexts] = useState<Record<number, string>>({});

    // Автоматичне збереження всього стану (разом із задачами) в LocalStorage
    useEffect(() => {
        localStorage.setItem('shelter_animals', JSON.stringify(animals));
    }, [animals]);

        // Функція обробки завантаження файлу з ПК
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setUploadedImage(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    // Додавання нової тваринки (додано типізацію для форми React.FormEvent)
    const handleAddAnimal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !age.trim() || !description.trim()) {
            alert('Будь ласка, заповніть обовʼязкові поля (Кличка, Вік, Опис)!');
            return;
        }
        //Якщо користувач не додав фото, використовуємо стандартну картинку
        const defaultImage = type === 'Собака'
            ? 'https://media.istockphoto.com/id/1445196818/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D1%80%D1%83%D0%BF%D0%B0-%D0%BC%D0%B8%D0%BB%D0%B8%D1%85-%D0%B2%D0%B8%D1%85%D0%BE%D0%B2%D0%B0%D0%BD%D1%86%D1%96%D0%B2-%D0%BD%D0%B0-%D0%B1%D1%96%D0%BB%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%B1%D0%B0%D0%BD%D0%B5%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=855N0yuJoppiUbyP9EVR760uz0CSPZBS2QSjFvr8MHc='
            : 'https://media.istockphoto.com/id/1445196818/uk/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D1%80%D1%83%D0%BF%D0%B0-%D0%BC%D0%B8%D0%BB%D0%B8%D1%85-%D0%B2%D0%B8%D1%85%D0%BE%D0%B2%D0%B0%D0%BD%D1%86%D1%96%D0%B2-%D0%BD%D0%B0-%D0%B1%D1%96%D0%BB%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96-%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-%D0%B1%D0%B0%D0%BD%D0%B5%D1%80%D0%B0.jpg?s=612x612&w=0&k=20&c=855N0yuJoppiUbyP9EVR760uz0CSPZBS2QSjFvr8MHc=';

        // Створюємо об'єкт, який суворо відповідає інтерфейсу Animal
        const newAnimal: Animal = {
            id: Date.now(),
            name: name,
            type: type,
            age: age,
            description: description,
            image: uploadedImage ? uploadedImage : defaultImage,
            todos: [], // Нова тваринка реєструється з порожнім списком справ

        };

        setAnimals([...animals, newAnimal]);

        //очищення полів форми після додавання
        setName('');
        setAge('');
        setDescription('');
        setUploadedImage('');
        setType('Собака');

    // Скидаємо значення інпуту файлу, щоб можна було завантажити той самий файл повторно
        e.currentTarget.reset();
    };

    // Функція для видалення тваринки, коли їй знайшли господаря
    // Видалення тваринки за ID
    const handleRemoveAnimal = (id: number) => {
        setAnimals(animals.filter((animal) => animal.id !== id));
    };
    // --- Функції для Todo List всередині карток ---
// Перемикання чекбоксу справи (виконано / не виконано)
    const handleToggleTodo = (animalId: number, todoId: number) => {
        setAnimals(
            animals.map((animal) => {
                if (animal.id === animalId) {
                    return {
                        ...animal,
                        todos: (animal.todos || []).map((todo) =>
                            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
                        ),
                    };
                }
                return animal;
            })
        );
    };
// Додавання нової справи до конкретної тваринки
    const handleAddTodo = (animalId: number) => {
        const todoText = newTodoTexts[animalId]?.trim();
        if (!todoText) return;

        const newTodo: Todo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };

        setAnimals(
            animals.map((animal) => {
                if (animal.id === animalId) {
                    return {
                        ...animal,
                        todos: [...(animal.todos || []), newTodo],
                    };
                }
                return animal;
            })
        );

        // Очищаємо інпут конкретної тваринки
        setNewTodoTexts({ ...newTodoTexts, [animalId]: '' });
    };


    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <section className="mx-auto max-w-5xl">
                <h1 className="text-center text-4xl font-bold text-gray-900 tracking-tight mb-4">
                    Панель керування притулком
                </h1>
                <p className="text-center text-gray-600 mb-10">
                    Додавайте вихованців, завантажуйте фото та плануйте завдання по догляду. Усе зберігається автоматично!
                </p>

                {/* Форма додавання */}
                <section className="bg-white rounded-2xl p-6 shadow-md mb-12 max-w-xl mx-auto">
                    <h2 className="text-xl font-semibold text-gray-950 mb-4">
                        Приняти нову тваринку до притулку
                    </h2>
                    <form onSubmit={handleAddAnimal} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Кличка *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Сірко"
                                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Вік *
                                </label>
                                <input
                                    type="text"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="2 роки"
                                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Вид тварини
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="Собака">Собака</option>
                                    <option value="Кішка">Кішка</option>
                                    <option value="Інше">Інше</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                    Завантажити фото з ПК
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Прев'ю файлу */}
                        {uploadedImage && (
                            <div className="mt-2 flex items-center gap-4 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                <img
                                    src={uploadedImage}
                                    alt="Попередній перегляд"
                                    className="w-16 h-16 object-cover rounded-lg shadow-sm border border-emerald-200"
                                />
                                <p className="text-xs text-emerald-800 font-medium">Фото успішно додано!</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                Опис / Особливості *
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Розкажіть про характер тваринки..."
                                rows={2}
                                className="w-full text-sm px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2.5 rounded-xl transition shadow-sm"
                        >
                            Додати до каталогу
                        </button>
                    </form>
                </section>

                {/* Відображення карток тварин */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Тваринки в притулку ({animals.length})
                </h2>

                {animals.length === 0 ? (
                    <p className="text-center text-gray-500 py-10 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
                        Наразі всі тваринки знайшли свій дім! 🎉
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {animals.map((animal) => (
                            <article
                                key={animal.id}
                                className="rounded-2xl bg-white shadow-md transition hover:shadow-lg flex flex-col overflow-hidden justify-between"
                            >
                                <div>
                                    {/* Зображення тваринки */}
                                    <div className="h-52 w-full bg-gray-200 overflow-hidden relative">
                                        <img
                                            src={animal.image}
                                            alt={animal.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <span className="absolute top-3 left-3 rounded-full bg-emerald-100/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
                                        {animal.type}
                                    </span>
                                    </div>

                                    {/* Основний текстовий вміст та Todo List */}
                                    <div className="p-5">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
                                            <p className="text-xs font-medium text-gray-500">{animal.age}</p>
                                        </div>

                                        <p className="text-xs text-gray-600 mb-4 line-clamp-2">{animal.description}</p>

                                        <div className="border-t border-gray-100 pt-3">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                Список справ:
                                            </h4>

                                            {/* Безпечне виведення завдань через захисні умови */}
                                            {(!animal.todos || animal.todos.length === 0) ? (
                                                <p className="text-xs text-gray-400 italic mb-3">Завдань немає</p>
                                            ) : (
                                                <ul className="space-y-1.5 mb-3 max-h-32 overflow-y-auto pr-1">
                                                    {animal.todos.map((todo) => (
                                                        <li
                                                            key={todo.id}
                                                            onClick={() => handleToggleTodo(animal.id, todo.id)}
                                                            className={`flex items-center gap-2 cursor-pointer text-xs p-1.5 rounded-lg transition hover:bg-gray-50 ${
                                                                todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={todo.completed}
                                                                onChange={() => {}}
                                                                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"

                                                            />
                                                            <span className="break-all">{todo.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Форма додавання справи всередині картки */}
                                            <div className="flex gap-1.5 mb-4">
                                                <input
                                                    type="text"
                                                    placeholder="Що зробити..."
                                                    value={newTodoTexts[animal.id] || ''}
                                                    onChange={(e) => setNewTodoTexts({ ...newTodoTexts, [animal.id]: e.target.value })}
                                                    className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddTodo(animal.id)}
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                    {/* Кнопка видалення тваринки */}
                                    <div className="px-5 pb-5 mt-auto">
                                        <button
                                            onClick={() => handleRemoveAnimal(animal.id)}
                                            className="w-full border border-rose-200 hover:border-transparent hover:bg-rose-500 text-rose-600 hover:text-white font-medium text-xs py-2 rounded-xl transition shadow-sm"
                                        >
                                            Знайшов дім! 🏠
                                        </button>
                                    </div>
                            </article>
                            ))}
                    </div>
                )}
            </section>
        </main>
);
}

export default App;