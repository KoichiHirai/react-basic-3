module.exports = {
  transform: {
    // JavaScriptファイルをbabel-jestを使ってトランスパイルする
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Jestがモックするスタイルシートや画像ファイルの形式の設定
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
  },
  // テスト環境を指定する
  testEnvironment: 'jsdom',
};
