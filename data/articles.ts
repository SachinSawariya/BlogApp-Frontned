export const articles = {
  'getting-started': {
    id: 'getting-started',
    title: 'Getting Started with AI Development',
    content: `
      <h2>Introduction to AI Development</h2>
      <p>Welcome to the world of AI development! In this article, we'll cover the basics of getting started with AI development.</p>
      
      <h3>Prerequisites</h3>
      <ul>
        <li>Basic programming knowledge (Python recommended)</li>
        <li>Familiarity with basic mathematics</li>
        <li>Python and pip installed on your system</li>
      </ul>

      <h3>Setting Up Your Environment</h3>
      <p>First, let's set up a Python virtual environment and install the necessary packages:</p>
      <pre><code class="language-bash">python -m venv ai-env
source ai-env/bin/activate  # On Windows use: ai-env\Scripts\activate
pip install numpy pandas matplotlib scikit-learn tensorflow</code></pre>

      <h3>Your First AI Model</h3>
      <p>Let's create a simple linear regression model using scikit-learn:</p>
      <pre><code class="language-python">import numpy as np
from sklearn.linear_model import LinearRegression

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([1, 3, 2, 3, 5])

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make a prediction
prediction = model.predict([[6]])
print(f"Prediction for x=6: {prediction[0]}")</code></pre>
    `,
    lastUpdated: 'October 5, 2023',
    readTime: '5 min read'
  },
  'neural-networks': {
    id: 'neural-networks',
    title: 'Understanding Neural Networks',
    content: `
      <h2>Neural Networks: A Deep Dive</h2>
      <p>Neural networks are the backbone of modern deep learning. Let's explore how they work.</p>
      
      <h3>Basic Structure</h3>
      <p>A neural network consists of layers of interconnected nodes (neurons). The three main types of layers are:</p>
      <ol>
        <li><strong>Input Layer:</strong> Receives the input data</li>
        <li><strong>Hidden Layers:</strong> Perform computations and feature extraction</li>
        <li><strong>Output Layer:</strong> Produces the final prediction</li>
      </ol>

      <h3>Activation Functions</h3>
      <p>Activation functions introduce non-linearity into the network. Common ones include:</p>
      <ul>
        <li>ReLU (Rectified Linear Unit)</li>
        <li>Sigmoid</li>
        <li>Tanh</li>
        <li>Softmax (for output layer in classification)</li>
      </ul>

      <h3>Training Process</h3>
      <p>The training process involves:</p>
      <ol>
        <li>Forward pass: Compute predictions</li>
        <li>Calculate loss: Compare predictions with actual values</li>
        <li>Backward pass: Compute gradients</li>
        <li>Update weights: Using an optimizer like SGD or Adam</li>
      </ol>
    `,
    lastUpdated: 'October 5, 2023',
    readTime: '8 min read'
  },
  // Add more articles as needed
};

export const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    articles: [
      { id: 'getting-started', title: 'Introduction to AI Development' },
      { id: 'neural-networks', title: 'Understanding Neural Networks' },
    ]
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    articles: [
      { id: 'getting-startedss', title: 'Introduction to AI Development' },
      { id: 'neural-networks', title: 'Understanding Neural Networks' },
    ]
  },
];
