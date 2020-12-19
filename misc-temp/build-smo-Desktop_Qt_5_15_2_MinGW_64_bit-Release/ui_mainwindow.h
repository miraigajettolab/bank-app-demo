/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.15.2
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QApplication>
#include <QtWidgets/QDoubleSpinBox>
#include <QtWidgets/QGraphicsView>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>
#include <QtWidgets/QSpinBox>
#include <QtWidgets/QTabWidget>
#include <QtWidgets/QTableWidget>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QVBoxLayout *verticalLayout_3;
    QTabWidget *firstLevelTabs;
    QWidget *tab_3;
    QVBoxLayout *verticalLayout;
    QSpacerItem *verticalSpacer_2;
    QHBoxLayout *horizontalLayout_2;
    QSpacerItem *horizontalSpacer;
    QLabel *label;
    QSpinBox *sourcesNumberSpinBox;
    QSpacerItem *horizontalSpacer_2;
    QHBoxLayout *horizontalLayout_5;
    QSpacerItem *horizontalSpacer_9;
    QLabel *label_9;
    QDoubleSpinBox *poissonSpinBox;
    QSpacerItem *horizontalSpacer_3;
    QHBoxLayout *horizontalLayout_3;
    QSpacerItem *horizontalSpacer_10;
    QLabel *label_4;
    QSpinBox *processingNumberSpinBox;
    QSpacerItem *horizontalSpacer_4;
    QHBoxLayout *horizontalLayout_6;
    QSpacerItem *horizontalSpacer_11;
    QLabel *label_7;
    QSpinBox *normMinSpinBox;
    QSpacerItem *horizontalSpacer_5;
    QHBoxLayout *horizontalLayout_7;
    QSpacerItem *horizontalSpacer_12;
    QLabel *label_8;
    QSpinBox *normMaxSpinBox;
    QSpacerItem *horizontalSpacer_6;
    QHBoxLayout *horizontalLayout_4;
    QSpacerItem *horizontalSpacer_13;
    QLabel *label_6;
    QSpinBox *bufferSizeSpinBox;
    QSpacerItem *horizontalSpacer_7;
    QHBoxLayout *horizontalLayout_9;
    QSpacerItem *horizontalSpacer_14;
    QLabel *label_13;
    QSpinBox *totalTasksRequired;
    QSpacerItem *horizontalSpacer_8;
    QSpacerItem *verticalSpacer;
    QWidget *tab;
    QVBoxLayout *verticalLayout_4;
    QHBoxLayout *horizontalLayout_8;
    QVBoxLayout *verticalLayout_9;
    QVBoxLayout *verticalLayout_7;
    QLabel *label_2;
    QGraphicsView *graphicsView;
    QLabel *label_14;
    QTableWidget *stateTableWidget;
    QVBoxLayout *verticalLayout_11;
    QLabel *label_12;
    QTableWidget *processingStateTableWidget;
    QLabel *label_10;
    QTableWidget *bufferStateTableWidget;
    QProgressBar *stepProgressBar;
    QHBoxLayout *horizontalLayout;
    QPushButton *nextStepButton;
    QWidget *tab_2;
    QVBoxLayout *verticalLayout_2;
    QTabWidget *tabWidget_2;
    QWidget *tab_4;
    QVBoxLayout *verticalLayout_5;
    QTableWidget *generatorStatTableWidget;
    QWidget *tab_5;
    QVBoxLayout *verticalLayout_6;
    QTableWidget *processorStatTableWidget;
    QProgressBar *autoProgressBar;
    QPushButton *startAutoButton;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QString::fromUtf8("MainWindow"));
        MainWindow->resize(1273, 776);
        MainWindow->setStyleSheet(QString::fromUtf8("background: rgb(210, 210, 210)"));
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QString::fromUtf8("centralWidget"));
        centralWidget->setStyleSheet(QString::fromUtf8(""));
        verticalLayout_3 = new QVBoxLayout(centralWidget);
        verticalLayout_3->setSpacing(6);
        verticalLayout_3->setContentsMargins(11, 11, 11, 11);
        verticalLayout_3->setObjectName(QString::fromUtf8("verticalLayout_3"));
        verticalLayout_3->setContentsMargins(0, 0, 0, 0);
        firstLevelTabs = new QTabWidget(centralWidget);
        firstLevelTabs->setObjectName(QString::fromUtf8("firstLevelTabs"));
        QPalette palette;
        QBrush brush(QColor(210, 210, 210, 255));
        brush.setStyle(Qt::SolidPattern);
        palette.setBrush(QPalette::Active, QPalette::Button, brush);
        palette.setBrush(QPalette::Active, QPalette::Base, brush);
        palette.setBrush(QPalette::Active, QPalette::Window, brush);
        palette.setBrush(QPalette::Inactive, QPalette::Button, brush);
        palette.setBrush(QPalette::Inactive, QPalette::Base, brush);
        palette.setBrush(QPalette::Inactive, QPalette::Window, brush);
        palette.setBrush(QPalette::Disabled, QPalette::Button, brush);
        palette.setBrush(QPalette::Disabled, QPalette::Base, brush);
        palette.setBrush(QPalette::Disabled, QPalette::Window, brush);
        firstLevelTabs->setPalette(palette);
        QFont font;
        font.setFamily(QString::fromUtf8("Bahnschrift Light SemiCondensed"));
        font.setBold(false);
        font.setWeight(50);
        firstLevelTabs->setFont(font);
        firstLevelTabs->setAcceptDrops(false);
        firstLevelTabs->setAutoFillBackground(false);
        firstLevelTabs->setStyleSheet(QString::fromUtf8(""));
        tab_3 = new QWidget();
        tab_3->setObjectName(QString::fromUtf8("tab_3"));
        verticalLayout = new QVBoxLayout(tab_3);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QString::fromUtf8("verticalLayout"));
        verticalSpacer_2 = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Fixed);

        verticalLayout->addItem(verticalSpacer_2);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QString::fromUtf8("horizontalLayout_2"));
        horizontalSpacer = new QSpacerItem(195, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer);

        label = new QLabel(tab_3);
        label->setObjectName(QString::fromUtf8("label"));
        QFont font1;
        font1.setFamily(QString::fromUtf8("MS Shell Dlg 2"));
        font1.setPointSize(12);
        font1.setBold(false);
        font1.setWeight(50);
        label->setFont(font1);

        horizontalLayout_2->addWidget(label);

        sourcesNumberSpinBox = new QSpinBox(tab_3);
        sourcesNumberSpinBox->setObjectName(QString::fromUtf8("sourcesNumberSpinBox"));
        QFont font2;
        font2.setFamily(QString::fromUtf8("MS Shell Dlg 2"));
        font2.setPointSize(10);
        font2.setBold(false);
        font2.setWeight(50);
        sourcesNumberSpinBox->setFont(font2);
        sourcesNumberSpinBox->setMinimum(1);
        sourcesNumberSpinBox->setValue(3);
        sourcesNumberSpinBox->setDisplayIntegerBase(10);

        horizontalLayout_2->addWidget(sourcesNumberSpinBox);

        horizontalSpacer_2 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_2->addItem(horizontalSpacer_2);


        verticalLayout->addLayout(horizontalLayout_2);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QString::fromUtf8("horizontalLayout_5"));
        horizontalSpacer_9 = new QSpacerItem(40, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_5->addItem(horizontalSpacer_9);

        label_9 = new QLabel(tab_3);
        label_9->setObjectName(QString::fromUtf8("label_9"));
        label_9->setFont(font1);

        horizontalLayout_5->addWidget(label_9);

        poissonSpinBox = new QDoubleSpinBox(tab_3);
        poissonSpinBox->setObjectName(QString::fromUtf8("poissonSpinBox"));
        poissonSpinBox->setFont(font2);
        poissonSpinBox->setMaximum(1000.000000000000000);
        poissonSpinBox->setValue(3.000000000000000);

        horizontalLayout_5->addWidget(poissonSpinBox);

        horizontalSpacer_3 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_5->addItem(horizontalSpacer_3);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QString::fromUtf8("horizontalLayout_3"));
        horizontalSpacer_10 = new QSpacerItem(212, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_3->addItem(horizontalSpacer_10);

        label_4 = new QLabel(tab_3);
        label_4->setObjectName(QString::fromUtf8("label_4"));
        label_4->setFont(font1);

        horizontalLayout_3->addWidget(label_4);

        processingNumberSpinBox = new QSpinBox(tab_3);
        processingNumberSpinBox->setObjectName(QString::fromUtf8("processingNumberSpinBox"));
        processingNumberSpinBox->setFont(font2);
        processingNumberSpinBox->setMinimum(1);
        processingNumberSpinBox->setValue(3);

        horizontalLayout_3->addWidget(processingNumberSpinBox);

        horizontalSpacer_4 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_3->addItem(horizontalSpacer_4);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setSpacing(6);
        horizontalLayout_6->setObjectName(QString::fromUtf8("horizontalLayout_6"));
        horizontalSpacer_11 = new QSpacerItem(152, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_6->addItem(horizontalSpacer_11);

        label_7 = new QLabel(tab_3);
        label_7->setObjectName(QString::fromUtf8("label_7"));
        label_7->setFont(font1);

        horizontalLayout_6->addWidget(label_7);

        normMinSpinBox = new QSpinBox(tab_3);
        normMinSpinBox->setObjectName(QString::fromUtf8("normMinSpinBox"));
        normMinSpinBox->setFont(font2);
        normMinSpinBox->setMinimum(1);
        normMinSpinBox->setMaximum(1000);
        normMinSpinBox->setValue(6);

        horizontalLayout_6->addWidget(normMinSpinBox);

        horizontalSpacer_5 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_6->addItem(horizontalSpacer_5);


        verticalLayout->addLayout(horizontalLayout_6);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setSpacing(6);
        horizontalLayout_7->setObjectName(QString::fromUtf8("horizontalLayout_7"));
        horizontalSpacer_12 = new QSpacerItem(148, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_12);

        label_8 = new QLabel(tab_3);
        label_8->setObjectName(QString::fromUtf8("label_8"));
        label_8->setFont(font1);

        horizontalLayout_7->addWidget(label_8);

        normMaxSpinBox = new QSpinBox(tab_3);
        normMaxSpinBox->setObjectName(QString::fromUtf8("normMaxSpinBox"));
        normMaxSpinBox->setFont(font2);
        normMaxSpinBox->setMinimum(1);
        normMaxSpinBox->setMaximum(1000);
        normMaxSpinBox->setValue(7);

        horizontalLayout_7->addWidget(normMaxSpinBox);

        horizontalSpacer_6 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_7->addItem(horizontalSpacer_6);


        verticalLayout->addLayout(horizontalLayout_7);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setSpacing(6);
        horizontalLayout_4->setObjectName(QString::fromUtf8("horizontalLayout_4"));
        horizontalSpacer_13 = new QSpacerItem(270, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer_13);

        label_6 = new QLabel(tab_3);
        label_6->setObjectName(QString::fromUtf8("label_6"));
        label_6->setFont(font1);

        horizontalLayout_4->addWidget(label_6);

        bufferSizeSpinBox = new QSpinBox(tab_3);
        bufferSizeSpinBox->setObjectName(QString::fromUtf8("bufferSizeSpinBox"));
        bufferSizeSpinBox->setFont(font2);
        bufferSizeSpinBox->setMinimum(1);
        bufferSizeSpinBox->setValue(3);

        horizontalLayout_4->addWidget(bufferSizeSpinBox);

        horizontalSpacer_7 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_4->addItem(horizontalSpacer_7);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setSpacing(6);
        horizontalLayout_9->setObjectName(QString::fromUtf8("horizontalLayout_9"));
        horizontalSpacer_14 = new QSpacerItem(52, 20, QSizePolicy::Fixed, QSizePolicy::Minimum);

        horizontalLayout_9->addItem(horizontalSpacer_14);

        label_13 = new QLabel(tab_3);
        label_13->setObjectName(QString::fromUtf8("label_13"));
        label_13->setFont(font1);

        horizontalLayout_9->addWidget(label_13);

        totalTasksRequired = new QSpinBox(tab_3);
        totalTasksRequired->setObjectName(QString::fromUtf8("totalTasksRequired"));
        totalTasksRequired->setMinimum(1);
        totalTasksRequired->setMaximum(1000000);
        totalTasksRequired->setValue(100000);

        horizontalLayout_9->addWidget(totalTasksRequired);

        horizontalSpacer_8 = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout_9->addItem(horizontalSpacer_8);


        verticalLayout->addLayout(horizontalLayout_9);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        verticalLayout->addItem(verticalSpacer);

        firstLevelTabs->addTab(tab_3, QString());
        tab = new QWidget();
        tab->setObjectName(QString::fromUtf8("tab"));
        verticalLayout_4 = new QVBoxLayout(tab);
        verticalLayout_4->setSpacing(6);
        verticalLayout_4->setContentsMargins(11, 11, 11, 11);
        verticalLayout_4->setObjectName(QString::fromUtf8("verticalLayout_4"));
        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setSpacing(6);
        horizontalLayout_8->setObjectName(QString::fromUtf8("horizontalLayout_8"));
        verticalLayout_9 = new QVBoxLayout();
        verticalLayout_9->setSpacing(6);
        verticalLayout_9->setObjectName(QString::fromUtf8("verticalLayout_9"));

        horizontalLayout_8->addLayout(verticalLayout_9);

        verticalLayout_7 = new QVBoxLayout();
        verticalLayout_7->setSpacing(6);
        verticalLayout_7->setObjectName(QString::fromUtf8("verticalLayout_7"));
        label_2 = new QLabel(tab);
        label_2->setObjectName(QString::fromUtf8("label_2"));
        label_2->setEnabled(true);
        QFont font3;
        font3.setFamily(QString::fromUtf8("Bahnschrift Light SemiCondensed"));
        font3.setPointSize(12);
        label_2->setFont(font3);
        label_2->setScaledContents(false);
        label_2->setAlignment(Qt::AlignCenter);

        verticalLayout_7->addWidget(label_2);

        graphicsView = new QGraphicsView(tab);
        graphicsView->setObjectName(QString::fromUtf8("graphicsView"));
        graphicsView->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_7->addWidget(graphicsView);

        label_14 = new QLabel(tab);
        label_14->setObjectName(QString::fromUtf8("label_14"));
        QFont font4;
        font4.setFamily(QString::fromUtf8("Bahnschrift Light SemiCondensed"));
        font4.setPointSize(12);
        font4.setBold(false);
        font4.setWeight(50);
        label_14->setFont(font4);
        label_14->setStyleSheet(QString::fromUtf8(""));
        label_14->setAlignment(Qt::AlignCenter);

        verticalLayout_7->addWidget(label_14);

        stateTableWidget = new QTableWidget(tab);
        stateTableWidget->setObjectName(QString::fromUtf8("stateTableWidget"));
        stateTableWidget->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_7->addWidget(stateTableWidget);


        horizontalLayout_8->addLayout(verticalLayout_7);

        verticalLayout_11 = new QVBoxLayout();
        verticalLayout_11->setSpacing(6);
        verticalLayout_11->setObjectName(QString::fromUtf8("verticalLayout_11"));
        label_12 = new QLabel(tab);
        label_12->setObjectName(QString::fromUtf8("label_12"));
        label_12->setFont(font4);
        label_12->setAutoFillBackground(false);
        label_12->setStyleSheet(QString::fromUtf8(""));
        label_12->setAlignment(Qt::AlignCenter);

        verticalLayout_11->addWidget(label_12);

        processingStateTableWidget = new QTableWidget(tab);
        processingStateTableWidget->setObjectName(QString::fromUtf8("processingStateTableWidget"));
        processingStateTableWidget->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_11->addWidget(processingStateTableWidget);

        label_10 = new QLabel(tab);
        label_10->setObjectName(QString::fromUtf8("label_10"));
        QFont font5;
        font5.setFamily(QString::fromUtf8("Bahnschrift Light SemiCondensed"));
        font5.setPointSize(12);
        font5.setBold(false);
        font5.setItalic(false);
        font5.setWeight(50);
        label_10->setFont(font5);
        label_10->setAutoFillBackground(false);
        label_10->setStyleSheet(QString::fromUtf8(""));
        label_10->setTextFormat(Qt::AutoText);
        label_10->setAlignment(Qt::AlignCenter);

        verticalLayout_11->addWidget(label_10);

        bufferStateTableWidget = new QTableWidget(tab);
        bufferStateTableWidget->setObjectName(QString::fromUtf8("bufferStateTableWidget"));
        bufferStateTableWidget->setAutoFillBackground(false);
        bufferStateTableWidget->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_11->addWidget(bufferStateTableWidget);


        horizontalLayout_8->addLayout(verticalLayout_11);


        verticalLayout_4->addLayout(horizontalLayout_8);

        stepProgressBar = new QProgressBar(tab);
        stepProgressBar->setObjectName(QString::fromUtf8("stepProgressBar"));
        stepProgressBar->setMaximumSize(QSize(0, 0));
        stepProgressBar->setStyleSheet(QString::fromUtf8(""));
        stepProgressBar->setValue(0);
        stepProgressBar->setTextVisible(true);

        verticalLayout_4->addWidget(stepProgressBar);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QString::fromUtf8("horizontalLayout"));
        nextStepButton = new QPushButton(tab);
        nextStepButton->setObjectName(QString::fromUtf8("nextStepButton"));
        nextStepButton->setFont(font);
        nextStepButton->setStyleSheet(QString::fromUtf8("background: rgb(255, 255, 255)"));

        horizontalLayout->addWidget(nextStepButton);


        verticalLayout_4->addLayout(horizontalLayout);

        firstLevelTabs->addTab(tab, QString());
        tab_2 = new QWidget();
        tab_2->setObjectName(QString::fromUtf8("tab_2"));
        tab_2->setStyleSheet(QString::fromUtf8(""));
        verticalLayout_2 = new QVBoxLayout(tab_2);
        verticalLayout_2->setSpacing(6);
        verticalLayout_2->setContentsMargins(11, 11, 11, 11);
        verticalLayout_2->setObjectName(QString::fromUtf8("verticalLayout_2"));
        tabWidget_2 = new QTabWidget(tab_2);
        tabWidget_2->setObjectName(QString::fromUtf8("tabWidget_2"));
        tabWidget_2->setAutoFillBackground(false);
        tabWidget_2->setStyleSheet(QString::fromUtf8(""));
        tab_4 = new QWidget();
        tab_4->setObjectName(QString::fromUtf8("tab_4"));
        verticalLayout_5 = new QVBoxLayout(tab_4);
        verticalLayout_5->setSpacing(6);
        verticalLayout_5->setContentsMargins(11, 11, 11, 11);
        verticalLayout_5->setObjectName(QString::fromUtf8("verticalLayout_5"));
        generatorStatTableWidget = new QTableWidget(tab_4);
        generatorStatTableWidget->setObjectName(QString::fromUtf8("generatorStatTableWidget"));
        generatorStatTableWidget->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_5->addWidget(generatorStatTableWidget);

        tabWidget_2->addTab(tab_4, QString());
        tab_5 = new QWidget();
        tab_5->setObjectName(QString::fromUtf8("tab_5"));
        verticalLayout_6 = new QVBoxLayout(tab_5);
        verticalLayout_6->setSpacing(6);
        verticalLayout_6->setContentsMargins(11, 11, 11, 11);
        verticalLayout_6->setObjectName(QString::fromUtf8("verticalLayout_6"));
        processorStatTableWidget = new QTableWidget(tab_5);
        processorStatTableWidget->setObjectName(QString::fromUtf8("processorStatTableWidget"));
        processorStatTableWidget->setStyleSheet(QString::fromUtf8(""));

        verticalLayout_6->addWidget(processorStatTableWidget);

        tabWidget_2->addTab(tab_5, QString());

        verticalLayout_2->addWidget(tabWidget_2);

        autoProgressBar = new QProgressBar(tab_2);
        autoProgressBar->setObjectName(QString::fromUtf8("autoProgressBar"));
        autoProgressBar->setLayoutDirection(Qt::LeftToRight);
        autoProgressBar->setStyleSheet(QString::fromUtf8("QProgressBar {\n"
"    border: 2px solid grey;\n"
"    border-radius: 5px;\n"
"}\n"
"\n"
"QProgressBar::chunk {\n"
"    background-color: #b32424;\n"
"    width: 10px;\n"
"    margin: 0.5px;\n"
"}"));
        autoProgressBar->setValue(0);
        autoProgressBar->setTextVisible(false);

        verticalLayout_2->addWidget(autoProgressBar);

        startAutoButton = new QPushButton(tab_2);
        startAutoButton->setObjectName(QString::fromUtf8("startAutoButton"));
        startAutoButton->setStyleSheet(QString::fromUtf8("background:rgb(255, 255, 255)"));

        verticalLayout_2->addWidget(startAutoButton);

        firstLevelTabs->addTab(tab_2, QString());

        verticalLayout_3->addWidget(firstLevelTabs);

        MainWindow->setCentralWidget(centralWidget);

        retranslateUi(MainWindow);

        firstLevelTabs->setCurrentIndex(0);
        tabWidget_2->setCurrentIndex(0);


        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QCoreApplication::translate("MainWindow", "SMO", nullptr));
        label->setText(QCoreApplication::translate("MainWindow", "\320\232\320\276\320\273\320\270\321\207\320\265\321\201\321\202\320\262\320\276 \320\270\321\201\321\202\320\276\321\207\320\275\320\270\320\272\320\276\320\262:", nullptr));
        label_9->setText(QCoreApplication::translate("MainWindow", "\320\237\320\260\321\200\320\260\320\274\320\265\321\202\321\200 \321\200\320\260\321\201\320\277\321\200\320\265\320\264\320\265\320\273\320\265\320\275\320\270\321\217 \320\237\321\203\320\260\321\201\321\201\320\276\320\275\320\260:", nullptr));
        label_4->setText(QCoreApplication::translate("MainWindow", "\320\232\320\276\320\273\320\270\321\207\320\265\321\201\321\202\320\262\320\276 \320\277\321\200\320\270\320\261\320\276\321\200\320\276\320\262:", nullptr));
        label_7->setText(QCoreApplication::translate("MainWindow", "\320\235\320\276\321\200\320\274. \321\200\320\260\321\201\320\277\321\200\320\265\320\264\320\265\320\273\320\265\320\275\320\270\320\265 min:", nullptr));
        normMinSpinBox->setSuffix(QString());
        label_8->setText(QCoreApplication::translate("MainWindow", "\320\235\320\276\321\200\320\274. \321\200\320\260\321\201\320\277\321\200\320\265\320\264\320\265\320\273\320\265\320\275\320\270\320\265 max:", nullptr));
        label_6->setText(QCoreApplication::translate("MainWindow", "\320\240\320\260\320\267\320\274\320\265\321\200 \320\261\321\203\321\204\320\265\321\200\320\260:", nullptr));
        label_13->setText(QCoreApplication::translate("MainWindow", "\320\232\320\276\320\273\320\270\321\207\320\265\321\201\321\202\320\262\320\276 \320\276\320\261\321\200\320\260\320\261\320\260\321\202\321\213\320\262\320\260\320\265\320\274\321\213\321\205 \320\267\320\260\320\264\320\260\321\207:", nullptr));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab_3), QCoreApplication::translate("MainWindow", "\320\237\320\260\321\200\320\260\320\274\320\265\321\202\321\200\321\213", nullptr));
        label_2->setText(QCoreApplication::translate("MainWindow", "\320\222\321\200\320\265\320\274\320\265\320\275\320\275\320\260\321\217 \320\264\320\270\320\260\320\263\321\200\320\260\320\274\320\274\320\260:", nullptr));
        label_14->setText(QCoreApplication::translate("MainWindow", "\320\241\320\276\320\261\321\213\321\202\320\270\321\217:", nullptr));
        label_12->setText(QCoreApplication::translate("MainWindow", "\320\241\320\276\321\201\321\202\320\276\321\217\320\275\320\270\320\265 \320\277\321\200\320\270\320\261\320\276\321\200\320\276\320\262:", nullptr));
        label_10->setText(QCoreApplication::translate("MainWindow", "\320\241\320\276\321\201\321\202\320\276\321\217\320\275\320\270\320\265 \320\261\321\203\321\204\321\204\320\265\321\200\320\260:", nullptr));
        nextStepButton->setText(QCoreApplication::translate("MainWindow", "\320\241\320\273\320\265\320\264\321\203\321\216\321\211\320\270\320\271 \320\250\320\260\320\263", nullptr));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab), QCoreApplication::translate("MainWindow", "\320\237\320\276\321\210\320\260\320\263\320\276\320\262\320\276", nullptr));
        tabWidget_2->setTabText(tabWidget_2->indexOf(tab_4), QCoreApplication::translate("MainWindow", "\320\241\321\202\320\260\321\202\320\270\321\201\321\202\320\270\320\272\320\260 \320\230\321\201\321\202\320\276\321\207\320\275\320\270\320\272\320\276\320\262", nullptr));
        tabWidget_2->setTabText(tabWidget_2->indexOf(tab_5), QCoreApplication::translate("MainWindow", "\320\241\321\202\320\260\321\202\320\270\321\201\321\202\320\270\320\272\320\260 \320\237\321\200\320\270\320\261\320\276\321\200\320\276\320\262", nullptr));
        startAutoButton->setText(QCoreApplication::translate("MainWindow", "\320\235\320\260\321\207\320\260\321\202\321\214", nullptr));
        firstLevelTabs->setTabText(firstLevelTabs->indexOf(tab_2), QCoreApplication::translate("MainWindow", "\320\220\320\262\321\202\320\276 \321\200\320\265\320\266\320\270\320\274", nullptr));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
